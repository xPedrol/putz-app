import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from '../../../../models/project.model';
import {ScheduleService} from '../../../../services/schedule.service';
import {FormControl} from '@angular/forms';
import {combineLatest, Subject} from 'rxjs';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {ProjectStepService} from '../../../../services/project-step.service';
import {State} from '../../../../models/table/state.model';
import {ActivatedRoute, Router} from '@angular/router';
import {IProjectStep} from '../../../../models/project-step.model';
import {NbToastrService} from '@nebular/theme';
import {TableBase} from '../../../../models/table/table-base.model';
import {Authority} from '../../../../constants/authority.constants';
import {AccountService} from '../../../../services/account.service';

@Component({
  selector: 'app-project-schedule-tab',
  templateUrl: './project-schedule-tab.component.html',
  styleUrls: ['./project-schedule-tab.component.scss']
})
export class ProjectScheduleTabComponent extends TableBase implements OnInit, OnDestroy {
  subject$: Subject<any>;
  project: IProject | undefined;
  scheduleNames: string[] | undefined;
  projectSteps: IProjectStep[] | undefined;
  scheduleSearch: FormControl;
  tableView = true;
  listSize = 15;
  canEdit = false;

  constructor(
    private projectService: ProjectService,
    private scheduleService: ScheduleService,
    public projectStepService: ProjectStepService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private toastService: NbToastrService,
    private accountService: AccountService
  ) {
    super(router, activatedRoute);
    this.scheduleSearch = new FormControl();
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
        this.createState(queryParams);
    });
    this.projectStepService.projectSteps$.pipe(takeUntil(this.subject$)).subscribe(req => {
      this.listTotalSize = this.projectStepService.totalCount$.getValue() ?? 0;
      if (req && req?.projectSteps) {
        this.projectSteps = req.projectSteps;
        if (this.listTotalSize === 0) {
          this.listTotalSize = req.projectSteps.length ?? 0;
        }
      }
    });
    combineLatest([
      this.projectService.project$,
      this.accountService.accountSubject
    ]).pipe(takeUntil(this.subject$)).subscribe(([project, account]) => {
      if (project && project !== this.project) {
        this.project = project;
        if (this.project?.id) {
          this.createState(this.activatedRoute.snapshot.queryParams);
          this.getScheduleNames(true);
        }
      }
      if (project && account) {
        if (account.notHasAnyAuthority([Authority.ADMIN])) {
          this.canEdit = project.canEdit;
        } else {
          this.canEdit = true;
        }
      }
    });
    this.scheduleSearch.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.subject$)).subscribe(value => {
        this.getProjectStepsBySchedule(null);
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

  getProjectStepsBySchedule(req?: any, force = false): void {
    const ids = {
      projectId: this.project?.id,
      scheduleName: this.scheduleSearch.value
    };
    if (!req) {
      req = this.state?.getQuery;
    }
    req.page--;
    this.projectStepService.queryByScheduleName(ids, req).pipe(takeUntil(this.subject$)).subscribe();

  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      if (params?.sort) {
        this.state?.sort?.convertSortParams(params?.sort);
      } else {
        this.state?.sort?.convertSortParams('startDateExpected,asc');
      }
      this.state.setSearchTerm(params);
    } else {
      this.state = new State({page: 1, size: this.listSize});
    }
    this.listSize = this.state?.size;
  }

  onSort(event: any) {
    this.state!.sort = event;
    this.handleNavigation(this.state?.getQuery);
  }

  synchronizeSchedule(): void {
    if (this.project?.id) {
      this.projectService.synchronizeSchedule(this.project.id).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Sincronizado com sucesso', {status: 'success'});
        this.getProjectStepsBySchedule(null, true);
      });
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
    // this.projectStepService.clearProjectSteps();
  }
}
