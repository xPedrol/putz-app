import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadService} from '../../../../services/head.service';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {State} from '../../../../models/table/state.model';
import {TableBase} from '../../../../models/table/table-base.model';
import {EntityArrayResponseType, ProjectCaseService} from '../../../../services/project-case.service';
import {IProjectCase} from '../../../../models/project-case.model';

@Component({
  selector: 'app-project-case-crud-dashboard',
  templateUrl: './project-case-crud-dashboard.component.html',
  styleUrls: ['./project-case-crud-dashboard.component.scss']
})
export class ProjectCaseCrudDashboardComponent extends TableBase implements OnInit, OnDestroy{
  subject$: Subject<any>;
  projectCases: IProjectCase[] | undefined;
  defaultListSize = 15;
  projectCaseSearch: FormControl;
  loadingProjectCases = false;

  constructor(
    public projectCaseService: ProjectCaseService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private headService: HeadService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
    this.projectCaseSearch = new FormControl();
    headService.setTitle('ProjectCases');
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.projectCaseSearch.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      if (this.state && this.state.searchTerm?.['name.contains'] !== value) {
        if (value) {
          this.state.searchTerm = {'name.contains': value};
        } else {
          this.state.searchTerm = undefined;
        }
        this.handleNavigation(this.state.getQuery);
      }
    });

    this.activatedRoute.queryParams.subscribe((queryParams: any) => {
      if (queryParams?.size && queryParams?.page) {
        if (queryParams?.search) {
          this.projectCaseSearch.setValue(queryParams.search);
        }
        this.createState(queryParams);
      } else {
        this.createState();
      }
      this.getProjectCases();
    });
    this.projectCaseService.totalCount$.pipe(takeUntil(this.subject$)).subscribe(total => {
      this.listTotalSize = total ?? 0;
    });
    this.projectCaseService.projectCases$.pipe(takeUntil(this.subject$)).subscribe(res => {
      if (res?.body) {
        this.projectCases = res.body;
      }
    });
  }

  getProjectCases(query: any = null): void {
    this.loadingProjectCases = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query!.page--;
    this.handleProjectCase(this.projectCaseService.queryByAdmin(query));
  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
    } else {
      this.state = new State({page: 1, size: this.defaultListSize});
    }
    this.defaultListSize = this.state?.size;
  }

  handleProjectCase(observable: Observable<EntityArrayResponseType>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe().add(() => this.loadingProjectCases = false);
  }


  ngOnDestroy(): void {
    this.projectCaseService.clearProjectCases();
    this.subject$.next(null);
    this.subject$.complete();
  }

  pageChange(event: number): void {
    this.state!.page = event;
    this.handleNavigation(this.state?.getQuery);
  }

  sizeChange(event: number): void {
    this.state!.size = event;
    this.handleNavigation(this.state?.getQuery);
  }

}
