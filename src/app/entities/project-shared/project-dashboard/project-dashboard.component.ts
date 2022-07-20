import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IProject} from '../../../models/project.model';
import {ProjectService, queryType} from '../../../services/project.service';
import {Observable, Subject} from 'rxjs';
import {NbDialogService, NbMenuService, NbTagComponent} from '@nebular/theme';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {MiddlewareCookieService} from '../../../services/middleware-cookie.service';
import {FormControl} from '@angular/forms';
import {IState, State} from '../../../models/table/state.model';
import {TableBase} from '../../../models/table/table-base.model';
import {AccountService} from '../../../services/account.service';
import {ProjectStatusArray, ProjectStatusClientArray} from '../../../constants/project-status.constants';
import {TranslateService} from '@ngx-translate/core';
import {Authority} from '../../../constants/authority.constants';
import {ProjectStatus} from '../../../models/enums/project-status.model';
import {HeadService} from '../../../services/head.service';
import {deleteField} from "../../../core/utils/deleteField";
import {
  ProjectRenderErrorsDialogComponent
} from "../../render-shared/project-render-errors-dialog/project-render-errors-dialog.component";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: [
    './project-dashboard.component.scss',
    '../../../shared/themes/common.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDashboardComponent extends TableBase implements OnInit, OnDestroy {
  subject$: Subject<any>;
  @Input() queryParam = true;
  projectStatus: string[] = [];
  projects: IProject[] | undefined;
  defaultProjectTableSize = 15;
  projectStatusItems: any[] = [];
  projectTableView = false;
  projectSearch: FormControl;
  state: IState | undefined;
  loadingProjects = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public projectService: ProjectService,
    private nbMenuService: NbMenuService,
    public router: Router,
    private cookieService: MiddlewareCookieService,
    private accountService: AccountService,
    private translateService: TranslateService,
    private headService: HeadService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService:NbDialogService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
    this.projectSearch = new FormControl();
    this.headService.setTitle('Projetos');
  }

  ngOnInit(): void {
    let itemsArray: string[] = [];
    this.accountService.accountSubject.pipe(takeUntil(this.subject$)).subscribe((account) => {
      if (account?.hasOnlyAuthority([Authority.CLIENT, Authority.AGENCY])) {
        itemsArray = ProjectStatusClientArray;
      } else if(!account?.hasOnlyAuthority([Authority.FREELANCER])) {
        itemsArray = ProjectStatusArray;
      }
      itemsArray.forEach(item => {
        this.translateService.get(`project.status.${item}`).pipe(takeUntil(this.subject$)).subscribe((translation: string) => {
          this.projectStatusItems.push({id: item, title: translation});
        });
      });
    });
    this.createState();
    this.projectSearch.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe(value => {
      if (value) {
        this.state.searchTerm['search'] = value;
        this.handleNavigation(this.state.getQuery);

      } else {
        deleteField(this.state.searchTerm, 'search');
        this.handleNavigation(this.state.getQuery);
      }
    });
    this.setProjectGridView();
    this.activatedRoute.queryParams.pipe(takeUntil(this.subject$)).subscribe((queryParams: any) => {
      this.projectStatus = queryParams!.projectStatus ?? [];
      if (!Array.isArray(this.projectStatus)) {
        this.projectStatus = [this.projectStatus];
      }
      this.createState(queryParams);
      if (this.state && this.state.searchTerm['search']) {
        this.projectSearch.setValue(this.state.searchTerm['search'], {emitEvent: false});
      } else {
        this.projectSearch.setValue('', {emitEvent: false});
      }
      this.getProjects(null, !this.projectService.projects$.getValue()?.projects);
    });
    this.projectService.projects$.subscribe({
      next: (req) => {
        if (req?.projects) {
          this.projects = req.projects;
        } else {
          this.projects = [];
        }
        this.changeDetectorRef.detectChanges();
      }
    });
    this.projectService.totalCount$.pipe(takeUntil(this.subject$)).subscribe(total => {
      this.listTotalSize = total ?? 0;
    });
  }


  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
    } else {
      this.state = new State({page: 1, size: this.defaultProjectTableSize});
    }
    this.defaultProjectTableSize = this.state?.size;
  }

  getProjects(query: any = null, withLoad?: boolean): void {
    if (!query) {
      query = this.state?.getQuery;
    }
    query.page--;
    // if (withLoad) {
    this.loadingProjects = true;
    // }
    let isJustConception = true;
    this.changeDetectorRef.detectChanges();
    this.projectStatus.forEach(status => {
      if (status !== ProjectStatus.CONCEPTION && status !== ProjectStatus.BRIEFING) {
        isJustConception = false;
      }
    });
    this.projectsHandle(this.projectService.query(query));
  }


  projectsHandle(observable: Observable<queryType>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe(
    ).add(() => {
      this.loadingProjects = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  removeTag(event: NbTagComponent): void {
    const index = this.projectStatus.indexOf(event.role);
    const aux = new Array(...this.projectStatus);
    if (index >= 0) {
      aux.splice(index, 1);
      this.state?.setSearchTerm({...this.state?.getQuery, ...{projectStatus: aux}});
      this.handleNavigation(this.state?.getQuery);
    }
  }

  handleSelectStatus(status: any): void {
    this.state?.setSearchTerm({...this.state?.getQuery, ...{projectStatus: status}});
    this.handleNavigation(this.state?.getQuery);
  }

  openProjectRenderErrorsDialog():void{
    this.dialogService.open(ProjectRenderErrorsDialogComponent, {});
  }

  ngOnDestroy(): void {
    this.projectService.clearProjects();
    this.subject$.next(null);
    this.subject$.complete();
  }

  changeProjectGridView(): void {
    this.projectTableView = !this.projectTableView;
    this.cookieService.putCookie('projectTableView', this.projectTableView);
  }

  setProjectGridView(): void {
    const projectTableView = this.cookieService.getCookie('projectTableView') ?? null;
    this.projectTableView = projectTableView === 'true';
  }

}
