import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectItemRequestService} from '../../../services/project-item-request.service';
import {IProjectItemRequest} from '../../../models/project-item-request.model';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-opportunity-detail',
  templateUrl: './opportunity-detail.component.html',
  styleUrls: ['./opportunity-detail.component.scss','../../../shared/themes/nebular-overrides.scss']
})
export class OpportunityDetailComponent implements OnInit, OnDestroy {
  subject$: Subject<any>;
  request: IProjectItemRequest | undefined;
  requestId: number | undefined;

  constructor(
    private projectItemRequestService: ProjectItemRequestService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subject$ = new Subject<any>();
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getRequest(): void {
    if (this.requestId) {
      this.projectItemRequestService.find(this.requestId).pipe(takeUntil(this.subject$)).subscribe((request) => {
        this.request = request;
      });
    }
  }

  getParams(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.requestId = params!.opportunityId;
      this.getRequest();
    });
  }

}
