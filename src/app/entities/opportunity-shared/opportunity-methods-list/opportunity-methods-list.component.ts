import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IProjectItemRequest} from '../../../models/project-item-request.model';
import {ProjectItemRequestStatus} from '../../../models/enums/project-item-request-status.model';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../constants/dialog-action.constants';
import {takeUntil} from 'rxjs/operators';
import {ProjectItemRequestService} from '../../../services/project-item-request.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-opportunity-methods-list',
  template: ``,
})
export class OpportunityMethodsListComponent implements OnInit {
  opportunities: IProjectItemRequest[] | undefined;
  subject$: Subject<any>;
  @Output() onChanged: EventEmitter<any>;

  constructor(
    public projectItemRequestService: ProjectItemRequestService,
    public toastService: NbToastrService,
    public dialogService: NbDialogService
  ) {
    this.subject$ = new Subject<any>();
    this.onChanged = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  changeOpportunityStatus(request: IProjectItemRequest, status: ProjectItemRequestStatus): void {
    request.requestStatus = status;
    this.projectItemRequestService.changeRequestStatusWithAllObj(request, false).subscribe((newRequest) => {
      switch (status) {
        case ProjectItemRequestStatus.APPROVED:
          this.toastService.show('', `Aprovado com sucesso`, {status: 'success'});
          break;
        case ProjectItemRequestStatus.DECLINED:
          this.toastService.show('', `Reprovado com sucesso`, {status: 'success'});
          break;
      }

      let aux: IProjectItemRequest[] | undefined = this.opportunities ? [...this.opportunities] : [];
      aux = aux?.map(opportunity => {
        if (opportunity.id === request.id) {
          opportunity = newRequest;
        }
        return opportunity;
      });
      this.projectItemRequestService.setProjectItemRequests({projectItemRequests: aux});
      this.onChanged.emit();
    });
  }

  delete(opportunity: IProjectItemRequest): void {
    const opportunityId = opportunity?.id;
    if (opportunityId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          msg: `Solicitação: ${opportunity?.projectItem?.name}`,
          action: DialogAction.DELETE
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.projectItemRequestService.delete(opportunityId).pipe(takeUntil(this.subject$)).subscribe(() => {
            const opportunities = new Set(this.projectItemRequestService.projectItemRequests$.getValue()?.projectItemRequests || []);
            if (opportunities.delete(opportunity)) {
              this.projectItemRequestService.setProjectItemRequests({projectItemRequests: Array.from(opportunities)});
              const size = this.projectItemRequestService.totalCount$.getValue() - 1;
              this.projectItemRequestService.totalCount$.next(size);
            }
          });
        }
      });
    }
  }
}
