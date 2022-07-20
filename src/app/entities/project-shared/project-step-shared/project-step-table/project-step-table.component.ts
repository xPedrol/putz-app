import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ITableColumn} from '../../../../models/table.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {SortEvent} from '../../../../directives/sortable.directive';
import {IProjectStep} from '../../../../models/project-step.model';
import {ProjectStepService} from '../../../../services/project-step.service';
import {ISort, Sort} from '../../../../models/table/sort.model';
import {ProjectStepDialogComponent} from '../project-step-dialog/project-step-dialog.component';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-step-table',
  templateUrl: './project-step-table.component.html',
  styleUrls: [
    './project-step-table.component.scss',
    '../../../../shared/themes/table.scss'
  ]
})
export class ProjectStepTableComponent implements OnInit, OnDestroy {
  subject$: Subject<any>;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  @Input() defaultSize: number | undefined;
  @Input() canEdit = true;
  sort: ISort | undefined;
  projectSteps: IProjectStep[] | undefined;
  columns: ITableColumn[] = [];
  projectsColumn: ITableColumn[] = [
    {
      title: 'ID',
      name: 'id',
      class: 'text-md-start',
      sort: true,
      hidden: true
    },
    {
      title: 'Nome',
      name: 'name',
      class: 'text-md-start',
      sort: true
    },
    {
      title: 'Dt. Início Plano',
      name: 'startDateExpected',
      class: 'text-md-start',
      sort: true
    },
    {
      title: 'Dt. Início',
      name: 'startDate',
      class: 'text-md-start',
      sort: true
    },
    {
      title: 'Dt. Fim Plano ',
      name: 'endDateExpected',
      class: 'text-md-start',
      sort: true
    },
    // {
    //   title: 'Dt. Prev Freela',
    //   name: 'forecastFreelaEndDate',
    //   class: 'text-md-start',
    //   sort: true
    // },
    {
      title: 'Dt. Prev Fim',
      name: 'forecastEndDate',
      class: 'text-md-start',
      sort: true
    },
    {
      title: 'Dt. Fim',
      name: 'endDate',
      class: 'text-md-start',
      sort: true
    },
    {
      title: 'Dias/Total',
      name: 'days',
      class: 'text-md-start',
      sort: true
    },
    // {
    //   title: 'Valor',
    //   name: 'valueCalc',
    //   class: 'text-md-start'
    // },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end',
      sort: false
    }
  ];

  constructor(
    public projectStepService: ProjectStepService,
    private toastService: NbToastrService,
    private dialogService: NbDialogService
  ) {
    this.subject$ = new Subject<any>();
    this.columns = this.projectsColumn;
  }

  ngOnInit(): void {
    this.projectStepService.projectSteps$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req && req?.projectSteps) {
        this.projectSteps = req.projectSteps;
      }
    }, () => {
      this.projectSteps = [];
    });
  }

  // resetting other headers
  //   this.headers.forEach(header => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });
  //
  //   this.service.sortColumn = column;
  //   this.service.sortDirection = direction;
  // }
  deleteProject(projectStep: IProjectStep): void {
    const projectId = projectStep?.id;
    if (projectId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.DELETE,
          msg: `Etapa: ${projectStep?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.projectStepService.delete(projectId).pipe(takeUntil(this.subject$)).subscribe(() => {
            const projectStepSet = new Set(this.projectSteps);
            if (projectStepSet.delete(projectStep)) {
              this.projectStepService.setProjectSteps({projectSteps: Array.from(projectStepSet)});
            }
            this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }

  openProjectStepDialog(projectStep: IProjectStep): void {
    this.dialogService.open(ProjectStepDialogComponent, {context: {projectStep}}).onClose.pipe(takeUntil(this.subject$)).subscribe((projectStep) => {
      if (projectStep) {
        this.projectSteps = this.projectSteps?.map(step => {
          if (step?.id === projectStep?.id) {
            return projectStep;
          } else {
            return step;
          }
        });
      }
      this.projectStepService.setProjectSteps({projectSteps: this.projectSteps ?? []});
    });
  }

  trackById(index: number, projectStep: IProjectStep): number {
    return projectStep.id as number;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
