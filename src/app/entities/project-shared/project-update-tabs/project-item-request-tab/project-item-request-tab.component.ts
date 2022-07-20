import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {State} from '../../../../models/table/state.model';
import {takeUntil} from 'rxjs/operators';
import {TableBase} from '../../../../models/table/table-base.model';
import {IProjectItemRequest} from '../../../../models/project-item-request.model';
import {ProjectItemRequestService} from '../../../../services/project-item-request.service';

@Component({
  selector: 'app-project-item-request-tab',
  templateUrl: './project-item-request-tab.component.html',
  styleUrls: [
    './project-item-request-tab.component.scss'
  ]
})
export class ProjectItemRequestTabComponent extends TableBase implements OnInit, OnDestroy {
  subject$: Subject<any>;
  itemRequests: IProjectItemRequest[] | undefined;
  project: IProject | undefined;
  isLoading = true;

  constructor(
    public projectItemRequestService: ProjectItemRequestService,
    private projectService: ProjectService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.createState();
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.project) {
        this.createState(params);
        this.getProjectItemRequests(this.state?.getQuery);
      }
    });
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
        if (this.project?.id) {
          this.createState(this.activatedRoute.snapshot.queryParams);
          this.getProjectItemRequests(this.state?.getQuery);
        }
      }
    });
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

  getProjectItemRequests(query: any = null): void {
    this.isLoading = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query.page--;
    if (this.project?.id) {
      this.projectItemRequestService.queryByProjectId(this.project.id, query).pipe(takeUntil(this.subject$)).subscribe({
        next: (res) => {
          if (res && res?.projectItemRequests) {
            this.itemRequests = res.projectItemRequests;
            this.listTotalSize = this.projectItemRequestService.totalCount$.getValue();
          }
        },
      }).add(() => this.isLoading = false);
    }

  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  resetList(): void {
    this.createState();
    this.getProjectItemRequests(this.state?.getQuery);
  }

}
