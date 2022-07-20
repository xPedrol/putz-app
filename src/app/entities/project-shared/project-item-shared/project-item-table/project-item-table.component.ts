import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ITableColumn, TableColumn} from '../../../../models/table.model';
import {ProjectItemService} from '../../../../services/project-item.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IProjectItem} from '../../../../models/project-item.model';
import {SortEvent} from '../../../../directives/sortable.directive';
import {
  OpportunityRequestDialogComponent
} from '../../../opportunity-shared/opportunity-request-dialog/opportunity-request-dialog.component';
import {AccountService} from '../../../../services/account.service';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {ISort, Sort} from '../../../../models/table/sort.model';
import {ProjectItemDialogComponent} from '../project-item-dialog/project-item-dialog.component';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {Authority} from '../../../../constants/authority.constants';

@Component({
  selector: 'app-project-item-table',
  templateUrl: './project-item-table.component.html',
  styleUrls: ['./project-item-table.component.scss', '../../../../shared/themes/common.scss']
})
export class ProjectItemTableComponent implements OnInit, OnDestroy {
  @Input() isOpportunity: boolean = false;
  @Input() canEdit: boolean = true;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  columns: ITableColumn[];
  subject$ = new Subject();
  project: IProject | undefined;
  projectItems: IProjectItem[] | undefined;
  projectItemsColumn: ITableColumn[] = [
    new TableColumn({
      title: 'Nome',
      name: 'name',
      class: 'text-md-start'
    }),
    new TableColumn({
      title: 'Quantidade',
      name: 'quantity',
      class: 'text-md-center'
    }),
    new TableColumn({
      title: 'Projeto',
      name: 'project',
      class: 'text-md-start'
    }),
    new TableColumn({
      title: 'Etapa',
      name: 'projectStep',
      class: 'text-md-start'
    }),
    new TableColumn({
      title: 'Freelancer',
      name: 'freelancer',
      class: 'text-md-start'
    }),
    new TableColumn({
      title: 'Oportunidade',
      name: 'isOpportunity',
      class: 'text-md-center'
    }),
    new TableColumn({
      title: 'Concluído',
      name: 'isClosed',
      class: 'text-md-center'
    }),
    new TableColumn({
      title: 'Valor / Extra',
      name: 'value',
      class: 'text-md-start'
    }),
    // {
    //   title: 'Dt. fechamento',
    //   name: 'closeDate',
    //   class: 'text-md-start'
    // },
    new TableColumn({
      title: '',
      name: 'actions',
      class: 'text-md-end',
      sort: false
    })
  ];
  projectAdminItemsColumn: ITableColumn[] = [
    new TableColumn({
      title: 'ID',
      name: 'id',
      class: 'text-md-start'
    }),
    ...this.projectItemsColumn
  ];

  constructor(
    public projectItemService: ProjectItemService,
    private toastService: NbToastrService,
    private dialogService: NbDialogService,
    public projectService: ProjectService,
    private accountService: AccountService
  ) {
    this.columns = [];
    this.accountService.accountSubject.pipe(takeUntil(this.subject$)).subscribe(account => {
      if (account && account.isAdmin) {
        this.columns = this.projectAdminItemsColumn;
      } else {
        this.columns = this.projectItemsColumn;
      }
      if (account.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER]) && account.hasAnyAuthority([Authority.AGENCY])) {
        this.columns.splice(this.columns.length - 2, 1);
      }
    });
  }

  ngOnInit(): void {
    this.projectItemService.projectItems$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req) {
        this.projectItems = req.projectItems;
      }
    }, () => {
      this.projectItems = [];
    });
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
        // this.projectItem.project = project;
      }
    });
  }

  deleteProjectItem(projectItem: IProjectItem): void {
    const ids = {
      projectId: this.project?.id ?? projectItem?.project?.id,
      itemId: projectItem?.id
    };
    if (ids) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.DELETE,
          msg: `Item: ${projectItem?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.projectItemService.delete(ids).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
            const itemSet: Set<IProjectItem> = new Set(this.projectItems);
            itemSet.delete(projectItem);
            this.projectItemService.setProjectItems({projectItems: this.projectItemService.convertProjectItems(Array.from(itemSet))});
            let totalCount = this.projectItemService.totalCount$.getValue();
            this.projectItemService.totalCount$.next(totalCount--);
          });
        }
      });
    }
  }

  openOpportunityRequestDialog(projectItem: IProjectItem | undefined): void {
    if (projectItem) {
      this.dialogService.open(OpportunityRequestDialogComponent, {context: {projectItem}});
    }
  }

  openUpdateProjectItemDialog(projectItem: IProjectItem | undefined): void {
    if (projectItem) {
      this.dialogService.open(ProjectItemDialogComponent, {
        context: {
          projectItem,
          saveItemOnBD: true
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(updatedItem => {
        if (updatedItem) {
          const items = this.projectItems;
          if (items && items?.length > 0) {
            const index = items.indexOf(projectItem);
            if (index > -1) {
              items[index] = updatedItem;
              // this.projectItemService.setProjectItems({projectItems: items});
            }
          }
        }
      });
    }
  }

  trackByFn(index: number, item: IProjectItem): number {
    return item.id as number;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }
}
