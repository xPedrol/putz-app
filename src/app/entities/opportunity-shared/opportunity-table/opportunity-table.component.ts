import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ProjectItemRequestService} from '../../../services/project-item-request.service';
import {IProjectItemRequest} from '../../../models/project-item-request.model';
import {AccountService} from '../../../services/account.service';
import {IAccount} from '../../../models/account.model';
import {ITableColumn} from '../../../models/table.model';
import {SortEvent} from '../../../directives/sortable.directive';
import {ISort, Sort} from '../../../models/table/sort.model';
import {ProjectItemRequestStatus} from '../../../models/enums/project-item-request-status.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {OpportunityMethodsListComponent} from '../opportunity-methods-list/opportunity-methods-list.component';

@Component({
  selector: 'app-opportunity-table',
  templateUrl: './opportunity-table.component.html',
  styleUrls: ['./opportunity-table.component.scss']
})
export class OpportunityTableComponent extends OpportunityMethodsListComponent implements OnInit {
  projectItemRequestStatus = ProjectItemRequestStatus;
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  opportunities: IProjectItemRequest[] | undefined;
  account: IAccount | undefined;
  columns: ITableColumn[] = [
    {
      title: 'Projeto',
      name: 'project',
      class: 'text-md-start'
    },
    {
      title: 'Item',
      name: 'item',
      class: 'text-md-start'
    },
    {
      title: 'Etapa',
      name: 'step',
      class: 'text-md-start'
    },
    {
      title: 'Valor',
      name: 'value',
      class: 'text-md-start'
    },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end'
    }
  ];

  constructor(
    public projectItemRequestService: ProjectItemRequestService,
    private accountService: AccountService,
    public toastService: NbToastrService,
    public dialogService: NbDialogService,
  ) {
    super(projectItemRequestService, toastService, dialogService);
  }

  ngOnInit(): void {
    this.projectItemRequestService.projectItemRequests$.subscribe(req => {
      if (req && req.projectItemRequests) {
        this.opportunities = req.projectItemRequests;
      }
    });
    this.accountService.accountSubject.pipe(takeUntil(this.subject$)).subscribe(account => {
      if (account) {
        this.account = account;
        if (account?.isAdmin) {
          this.columns.unshift({
            title: 'ID',
            name: 'id',
            class: 'text-md-start'
          });
          this.columns.splice(4, 0, {
            title: 'Freelancer',
            name: 'freelancer',
            class: 'text-md-start'
          },);
        }
      }
    });
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }

  trackOpportunitiesByFn(index: number, item: IProjectItemRequest) {
    return item.id;
  }

}
