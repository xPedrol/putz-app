import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IProjectItemRequest} from '../../../models/project-item-request.model';
import {ProjectItemRequestService, queryType} from '../../../services/project-item-request.service';
import {FormControl} from '@angular/forms';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {TableBase} from '../../../models/table/table-base.model';
import {ActivatedRoute, Router} from '@angular/router';
import {State} from '../../../models/table/state.model';
import {HeadService} from '../../../services/head.service';

@Component({
  selector: 'app-opportunity-dashboard',
  templateUrl: './opportunity-dashboard.component.html',
  styleUrls: [
    './opportunity-dashboard.component.scss'
  ]
})
export class OpportunityDashboardComponent extends TableBase implements OnInit, OnDestroy {
  defaultOpportunityListSize = 15;
  opportunities: IProjectItemRequest[] | undefined;
  searchFormControl: FormControl;
  isLoading = false;
  subject$: Subject<any>;
  tableView = false;
  constructor(
    public projectItemRequestService: ProjectItemRequestService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private headService: HeadService
  ) {
    super(router, activatedRoute);
    this.searchFormControl = new FormControl();
    this.headService.setTitle('Inscrições');
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.createState();
    this.searchFormControl.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      if (this.state) {
        this.state.searchTerm = {search: value};
        this.handleNavigation(this.state.getQuery);
        // this.getOpportunities(this.state.getQuery);
      }
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.createState(params);
      this.getOpportunities(this.state?.getQuery);
    });
    this.projectItemRequestService.totalCount$.pipe(takeUntil(this.subject$)).subscribe((total) => {
      this.listTotalSize = total ?? 0;
    });
    this.projectItemRequestService.projectItemRequests$.pipe(takeUntil(this.subject$)).subscribe((res) => {
      this.opportunities = res?.projectItemRequests;
    });
  }

  getOpportunities(query: any = null): void {
    this.isLoading = true;
    if (!query) {
      query = {size: this.defaultOpportunityListSize, page: 1};
    }
    query.page--;
    this.opportunitiesHandle(this.projectItemRequestService.getByAccount(query));
  }

  opportunitiesHandle(observable: Observable<queryType>): void {
    observable.subscribe().add(() => this.isLoading = false);
  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
    } else {
      this.state = new State();
    }
  }

  ngOnDestroy(): void {
    this.projectItemRequestService.clearProjectItemRequests();
  }
}
