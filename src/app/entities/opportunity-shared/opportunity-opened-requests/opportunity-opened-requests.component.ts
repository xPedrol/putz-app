import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {IProjectItem} from '../../../models/project-item.model';
import {ProjectItemService, queryType} from '../../../services/project-item.service';
import {FormControl} from '@angular/forms';
import {IState, State} from '../../../models/table/state.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-opportunity-opened-requests',
  templateUrl: './opportunity-opened-requests.component.html',
  styleUrls: [
    './opportunity-opened-requests.component.scss'
  ]
})
export class OpportunityOpenedRequestsComponent implements OnInit, OnDestroy {
  defaultOpportunityListSize = 15;
  projectItems: IProjectItem[] | undefined;
  searchInput: FormControl;
  tableView = false;
  state: IState | undefined;
  isLoading = false;

  constructor(
    public projectItemService: ProjectItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.searchInput = new FormControl();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.createState(params);
      this.getOpportunities();
    });
    // this.searchInput.valueChanges.pipe(debounceTime(500)).subscribe(value => {
    // });
    this.projectItemService.isOpportunity = true;
    // this.getOpportunities();
  }

  getOpportunities(query: any = null): void {
    this.isLoading = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query.page--;
    this.opportunitiesHandle(this.projectItemService.getOpportunitiesOpened(query));
  }

  opportunitiesHandle(observable: Observable<queryType>): void {
    observable.subscribe({
      next: ({headers, projectItems}) => {
        if (projectItems) {
          this.projectItems = projectItems;
        }
        if (headers) {
          this.projectItemService.totalCount$.next(Number(headers.get('X-Total-Count')));
        }
      },
    }).add(() => this.isLoading = false);
  }

  ngOnDestroy(): void {
    this.projectItemService.clearProjectItems();
  }

  createState(params: any = null): void {
    // if (!this.state) {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
    } else {
      this.state = new State({page: 1, size: this.defaultOpportunityListSize});
    }
    this.defaultOpportunityListSize = this.state?.size;
    // }
  }

  handleNavigation(params: any = null): void {
    this.router.navigate([`/opportunities/opened/list`], {queryParams: {...params}});
  }

  onSort(event: any) {
    this.state!.sort = event;
    this.handleNavigation(this.state?.getQuery);
  }

  pageChange(event: number): void {
    this.state!.page = event;
    this.handleNavigation(this.state?.getQuery);
  }

  sizeChange(event: number): void {
    this.state!.size = event;
    this.handleNavigation(this.state?.getQuery);
  }

  trackProjectItemsByFn(index: number, item: IProjectItem): number {
    return item.id as number;
  }
}
