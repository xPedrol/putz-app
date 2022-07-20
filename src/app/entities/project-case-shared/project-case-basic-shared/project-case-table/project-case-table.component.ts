import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ISort, Sort} from '../../../../models/table/sort.model';
import {ITableColumn} from '../../../../models/table.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AccountService} from '../../../../services/account.service';
import {takeUntil} from 'rxjs/operators';
import {SortEvent} from '../../../../directives/sortable.directive';
import {ICompetence} from '../../../../models/competence.model';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {IProjectCase} from '../../../../models/project-case.model';
import {ProjectCaseService} from '../../../../services/project-case.service';
export interface IProjectCaseOutput {
  projectCase: {
    ancient?: IProjectCase,
    current?: IProjectCase
  },
  action: string;
}
@Component({
  selector: 'app-project-case-table',
  templateUrl: './project-case-table.component.html',
  styleUrls: ['./project-case-table.component.scss']
})
export class ProjectCaseTableComponent implements OnInit {

  subject$: Subject<any>;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  projectCases: IProjectCase[] | undefined;
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
    //   name: 'projectCases',
    //   class: 'text-md-start'
    // },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end'
    }
  ];

  constructor(
    public projectCaseService: ProjectCaseService,
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
    this.projectCaseService.projectCases$.pipe(takeUntil(this.subject$)).subscribe(req => {
      this.projectCases = req?.body ?? undefined;
    });
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }

  deleteProjectCase(competence: IProjectCase | any): void {
    const competenceId = competence?.id;
    if (competenceId && competence) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Competência: ${competence?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.projectCaseService.delete(competenceId).pipe(takeUntil(this.subject$)).subscribe(() => {
            const newCompetence: IProjectCase = {...competence};
            newCompetence.isActive = false;
            this.onProjectsChange({projectCase: {ancient: competence, current: newCompetence}, action: 'UPDATE'});
            this.toastService.show('', 'Desativado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  onProjectsChange({projectCase, action}: IProjectCaseOutput): void {
    if (projectCase && action) {
      let index: number = -1;
      const projectCases: ICompetence[] = this.projectCases ? [...this.projectCases] : [];
      switch (action) {
        case 'DELETE':
          if (projectCase.ancient?.id) {
            index = projectCases.findIndex(p => p.id === projectCase.ancient.id);
            if (index > -1 && projectCases) {
              projectCases.splice(index, 1);
              const size = this.projectCaseService.totalCount$.getValue() - 1;
              this.projectCaseService.totalCount$.next(size);
            }
          }
          break;
        case 'UPDATE':
          if (projectCase.ancient?.id) {
            index = projectCases.findIndex(p => p.id === projectCase.ancient.id);
            if (index > -1 && projectCases && projectCase?.current) {
              projectCases[index] = projectCase.current;
            }
          }
          break;
      }
      if (projectCases) {
        // this.projectCaseService.setProjectCases({projectCases: projectCases});
      }
      // this.getTimeLineEvents();
    }
  }

  trackProjectCasesById(index: number, item: IProjectCase): number {
    return item.id as number;
  }

}
