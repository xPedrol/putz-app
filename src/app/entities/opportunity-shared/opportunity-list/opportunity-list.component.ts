import {Component, Input, OnInit} from '@angular/core';
import {ProjectItemRequestService} from '../../../services/project-item-request.service';
import {ProjectItemRequestStatus} from '../../../models/enums/project-item-request-status.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {takeUntil} from 'rxjs/operators';
import {IAccount} from '../../../models/account.model';
import {AccountService} from '../../../services/account.service';
import {OpportunityMethodsListComponent} from '../opportunity-methods-list/opportunity-methods-list.component';
import {IProjectItemRequest} from '../../../models/project-item-request.model';

@Component({
  selector: 'app-opportunity-list',
  templateUrl: './opportunity-list.component.html',
  styleUrls: ['./opportunity-list.component.scss'],
})
export class OpportunityListComponent extends OpportunityMethodsListComponent implements OnInit {
  @Input() advancedView: boolean = false;
  projectItemRequestStatus = ProjectItemRequestStatus;
  account: IAccount | undefined;

  constructor(
    public projectItemRequestService: ProjectItemRequestService,
    public toastService: NbToastrService,
    public dialogService: NbDialogService,
    private accountService: AccountService
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
      }
    });
  }
  trackOpportunitiesByFn(index:number, item:IProjectItemRequest):number {
    return item.id as number;
  }

}
