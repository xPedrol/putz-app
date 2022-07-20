import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ISort, Sort} from '../../../../../models/table/sort.model';
import {ICompetence} from '../../../../../models/competence.model';
import {ITableColumn} from '../../../../../models/table.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AccountService} from '../../../../../services/account.service';
import {takeUntil} from 'rxjs/operators';
import {SortEvent} from '../../../../../directives/sortable.directive';
import {ConfirmDialogComponent} from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../../constants/dialog-action.constants';
import {
  ICompetenceOutput
} from '../../../../competence-shared/competence-list-shared/competence-table/competence-table.component';
import {ICompetenceGuide} from '../../../../../models/competence-guide.model';
import {CompetenceGuideService} from '../../../../../services/competence-guide.service';
import {getProjectIndexByField} from '../../../../../core/utils/getIndexByField';

@Component({
  selector: 'app-competence-guide-crud-table',
  templateUrl: './competence-guide-crud-table.component.html',
  styleUrls: ['./competence-guide-crud-table.component.scss']
})
export class CompetenceGuideCrudTableComponent implements OnInit {
  subject$: Subject<any>;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  competenceGuides: ICompetenceGuide[] | undefined;
  columns: ITableColumn[] = [];
  projectsColumn: ITableColumn[] = [
    {
      title: 'Nome',
      name: 'name',
      class: 'text-md-start'
    },
    {
      title: 'Competência',
      name: 'competence',
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
    public competenceService: CompetenceGuideService,
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
    this.competenceService.competenceGuides$.pipe(takeUntil(this.subject$)).subscribe(req => {
      this.competenceGuides = req?.competenceGuides ?? undefined;
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
      const competences: ICompetence[] | undefined = this.competenceService.competenceGuides$.getValue()?.competenceGuides;
      switch (action) {
        case 'DELETE':
          if (tag.ancient?.id) {
            index = getProjectIndexByField('id',tag.ancient.id, competences);
            if (typeof index === 'number' && competences) {
              competences.splice(index, 1);
              const size = this.competenceService.totalCount$.getValue() - 1;
              this.competenceService.totalCount$.next(size);
            }
          }
          break;
        case 'UPDATE':
          if (tag.ancient?.id) {
            index = getProjectIndexByField('id',tag.ancient.id, competences);
            if (typeof index === 'number' && competences && tag?.current) {
              competences[index] = tag.current;
            }
          }
          break;
      }
      if (competences) {
        this.competenceService.setCompetenceGuides({competenceGuides: competences});
      }
      // this.getTimeLineEvents();
    }
  }
  trackCompetenceGuidesByFn(index: number, item: any): any {
    return item.id;
  }
}
