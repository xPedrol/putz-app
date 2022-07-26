import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectItemService} from '../../../../services/project-item.service';
import {IProjectItem} from '../../../../models/project-item.model';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from '../../../../models/project.model';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {combineLatest, Subject} from 'rxjs';
import {State} from '../../../../models/table/state.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectItemUpdateDialogComponent} from '../../project-item-shared/project-item-update-dialog/project-item-update-dialog.component';
import {NbDialogService} from '@nebular/theme';
import {TableBase} from '../../../../models/table/table-base.model';
import {Authority} from '../../../../constants/authority.constants';
import {AccountService} from '../../../../services/account.service';
import {FormControl} from '@angular/forms';
import {ScheduleService} from '../../../../services/schedule.service';

@Component({
  selector: 'app-project-item-tab',
  templateUrl: './project-item-tab.component.html',
  styleUrls: [
    './project-item-tab.component.scss'
  ]
})
export class ProjectItemTabComponent extends TableBase implements OnInit, OnDestroy {
  subject$: Subject<any>;
  projectItems: IProjectItem[] | undefined;
  project: IProject | undefined;
  isLoading = true;
  canEdit = false;
  scheduleSearch: FormControl;
  scheduleNames: string[] | undefined;
  constructor(
    public projectItemService: ProjectItemService,
    private projectService: ProjectService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private dialogService: NbDialogService,
    private accountService: AccountService,
    private scheduleService: ScheduleService,
  ) {
    super(router, activatedRoute);
    this.scheduleSearch = new FormControl();
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.createState();
    this.activatedRoute.queryParams.subscribe(params => {
        this.createState(params);
        this.getProjectItems(this.state?.getQuery);
    });
    combineLatest([
      this.projectService.project$,
      this.accountService.accountSubject
    ]).pipe(takeUntil(this.subject$)).subscribe(([project, account]) => {
      if (project && project !== this.project) {
        this.project = project;
        if (this.project?.id) {
          this.createState(this.activatedRoute.snapshot.queryParams);
          this.getScheduleNames(true)
        }
      }
      if (project && account) {
        if (account.notHasAnyAuthority([Authority.ADMIN])) {
          this.canEdit = project.canEdit;
        }else {
          this.canEdit = true;
        }
      }
      this.scheduleSearch.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.subject$)).subscribe(value => {
        this.getProjectItems();
      });
    });

    this.projectItemService.projectItems$.pipe(takeUntil(this.subject$)).subscribe(res => {
      if (res && res?.projectItems) {
        this.projectItems = res.projectItems;
      }
      this.listTotalSize = this.projectItemService.totalCount$.getValue();
    });
  }
  getScheduleNames(emitEvent = true): void {
    if (this.project?.id) {
      this.scheduleService.findScheduleNamesByProjectId(this.project.id).pipe(takeUntil(this.subject$)).subscribe(names => {
        this.scheduleNames = names;
        if (this.scheduleNames[0]) {
          this.scheduleSearch.setValue(this.scheduleNames[0], {emitEvent});
        }
      });
    }
  }
  createState(params: any = null): void {
    // if (!this.state) {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
    } else {
      this.state = new State();
    }
    // }
  }

  getProjectItems(query: any = null): void {
    this.isLoading = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query['schedule'] = this.scheduleSearch.value;
    query.page--;
    if (this.project?.id) {
      this.projectItemService.queryByProjectId(this.project.id, query).pipe(takeUntil(this.subject$)).subscribe().add(() => this.isLoading = false);
    }

  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }


  openProjectItemDialog(): void {
    this.dialogService.open(ProjectItemUpdateDialogComponent, {context: {saveItemOnBD: true}}).onClose.pipe(takeUntil(this.subject$)).subscribe(projectItem => {
      if (projectItem) {
        const items: IProjectItem[] = this.projectItemService.projectItems$.getValue()?.projectItems ?? [];
        items.push(projectItem);
        this.projectItemService.projectItems$.next({projectItems: items});
      }
    });
  }

}
