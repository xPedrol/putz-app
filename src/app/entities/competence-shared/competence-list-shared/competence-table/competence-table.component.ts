import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ISort, Sort} from '../../../../models/table/sort.model';
import {ITableColumn} from '../../../../models/table.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AccountService} from '../../../../services/account.service';
import {takeUntil} from 'rxjs/operators';
import {SortEvent} from '../../../../directives/sortable.directive';
import {Subject} from 'rxjs';
import {ICompetence} from '../../../../models/competence.model';
import {CompetenceService} from '../../../../services/competence.service';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';

export interface ICompetenceOutput {
  tag: {
    ancient?: ICompetence,
    current?: ICompetence
  },
  action: string;
}

@Component({
  selector: 'app-competence-table',
  templateUrl: './competence-table.component.html',
  styleUrls: [
    './competence-table.component.scss',
    '../../../../shared/themes/common.scss'
  ]
})
export class CompetenceTableComponent implements OnInit {
  subject$: Subject<any>;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  competences: ICompetence[] | undefined;
  columns: ITableColumn[] = [];
  projectsColumn: ITableColumn[] = [
    {
      title: 'Nome',
      name: 'name',
      class: 'text-md-start'
    },
    {
      title: 'Descrição',
      name: 'description',
      class: 'text-md-start'
    },
    {
      title: 'Criação',
      name: 'createdDate',
      class: 'text-md-start'
    },
    {
      title: 'Modificação',
      name: 'lastModifiedDate',
      class: 'text-md-start'
    },
    {
      title: 'Ativo',
      name: 'isActive',
      class: 'text-md-start'
    },
    // {
    //   title: 'Produtos',
    //   name: 'products',
    //   class: 'text-md-start'
    // },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end'
    }
  ];

  constructor(
    public competenceService: CompetenceService,
    public toastService: NbToastrService,
    public dialogService: NbDialogService,
    private accountService: AccountService
  ) {
    this.columns = this.projectsColumn;

    this.subject$ = new Subject();
  }

  ngOnInit(): void {
    this.accountService.accountSubject.pipe(takeUntil(this.subject$)).subscribe(account => {
      if (account && account?.isAdmin || account?.isManager) {
        this.projectsColumn.unshift({
          title: 'ID',
          name: 'id',
          class: 'text-md-start'
        });
      }
    });
    this.competenceService.competences$.pipe(takeUntil(this.subject$)).subscribe(req => {
      this.competences = req?.competences ?? undefined;
    });
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }

  deleteCompetence(competence: ICompetence | any): void {
    const competenceId = competence?.id;
    if (competenceId && competence) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Competência: ${competence?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.competenceService.delete(competenceId).pipe(takeUntil(this.subject$)).subscribe(() => {
            const newCompetence: ICompetence = {...competence};
            newCompetence.isActive = false;
            this.onProjectsChange({tag: {ancient: competence, current: newCompetence}, action: 'UPDATE'});
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  onProjectsChange({tag, action}: ICompetenceOutput): void {
    if (tag && action) {
      let index: number | null = null;
      const competences: ICompetence[] | undefined = this.competenceService.competences$.getValue()?.competences;
      switch (action) {
        case 'DELETE':
          if (tag.ancient?.id) {
            index = this.competenceService.getProjectIndexById(tag.ancient.id, competences);
            if (typeof index === 'number' && competences) {
              competences.splice(index, 1);
              const size = this.competenceService.totalCount$.getValue() - 1;
              this.competenceService.totalCount$.next(size);
            }
          }
          break;
        case 'UPDATE':
          if (tag.ancient?.id) {
            index = this.competenceService.getProjectIndexById(tag.ancient.id, competences);
            if (typeof index === 'number' && competences && tag?.current) {
              competences[index] = tag.current;
            }
          }
          break;
      }
      if (competences) {
        this.competenceService.setCompetences({competences});
      }
      // this.getTimeLineEvents();
    }
  }

  trackCompetencesById(index: number, item: ICompetence): number {
    return item.id as number;
  }
}
