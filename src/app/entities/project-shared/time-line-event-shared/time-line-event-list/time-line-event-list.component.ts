import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {IProject} from '../../../../models/project.model';
import {ProjectStepService} from '../../../../services/project-step.service';
import {IProjectStep} from '../../../../models/project-step.model';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {ScheduleService} from '../../../../services/schedule.service';
import {HeadService} from '../../../../services/head.service';

@Component({
  selector: 'app-time-line-event-list',
  templateUrl: './time-line-event-list.component.html',
  styleUrls: ['./time-line-event-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeLineEventListComponent implements OnInit, OnDestroy {
  subject$: Subject<any>;
  projectId: number | null = null;
  project: IProject | null = null;
  loadingProjectSteps = false;
  projectStatus: string | null = null;
  projectSteps: IProjectStep[] | undefined;
  scheduleSearch: FormControl;
  scheduleNames: string[] | undefined;
  error = false;
  refreshComponent$: BehaviorSubject<boolean>;

  constructor(
    private projectService: ProjectService,
    private projectStepService: ProjectStepService,
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private headService: HeadService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.scheduleSearch = new FormControl();
    this.subject$ = new Subject<any>();
    this.refreshComponent$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    this.refreshComponent$.pipe(takeUntil(this.subject$)).subscribe(value => {
      if (value) {
        this.getProjectSteps(this.scheduleSearch.value);
      }
    });
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params?.projectId;
      this.projectStatus = params?.projectStatus;
      this.getProject();
    });
    this.scheduleSearch.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.subject$)).subscribe(value => {
      if (value) {
        this.getProjectSteps(value);
      }
    });
    // console.warn(this.projectId);
  }

  getProjectSteps(scheduleName?: string): void {
    if (this.projectId) {
      this.loadingProjectSteps = true;
      scheduleName = scheduleName ?? this.scheduleSearch.value;
      this.projectStepService.queryByScheduleName({
        projectId: this.projectId,
        scheduleName
      }).pipe(takeUntil(this.subject$)).subscribe(req => {
        if (req && req.projectSteps) {
          this.projectSteps = req.projectSteps;
        }
      }).add(() => {
        this.loadingProjectSteps = false;
        this.changeDetector.markForCheck();
      });
    }
  }

  getProject(force = false): void {
    if (this.projectId) {
      this.getScheduleNames(force);
      this.projectHandle(this.projectService.find(this.projectId));
    }
    // if (this.projectId && this.projectStatus) {
    //   switch (this.projectStatus) {
    //     case 'actives':
    //       this.projectHandle(this.projectService.find(this.projectId));
    //       break;
    //     default:
    //       this.projectHandle(this.projectService.findProjectWithStatus(this.projectId, this.projectStatus));
    //       break;
    //   }
    // }
  }


  projectHandle(observable: Observable<IProject>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe({
      next: (project => {
        this.project = project;
        this.headService.setTitle(`${this.project?.name} (Timeline)`);
      }),
      error: () => {
        this.error = true;
      }
    }).add((() => this.changeDetector.detectChanges()));
  }

  getScheduleNames(force = false): void {
    if (this.projectId) {
      this.scheduleService.findScheduleNamesByProjectId(this.projectId).pipe(takeUntil(this.subject$)).subscribe(names => {
        this.scheduleNames = names;
        const main = 'principal';
        if (main !== this.scheduleSearch.value) {
          this.scheduleSearch.setValue(this.scheduleNames.includes(main) ? main : this.scheduleNames[0]);
        } else if (force) {
          this.getProjectSteps(this.scheduleSearch.value);
        }
      });
    }
  }

  trackProjectStepsByFn(index: number, item: IProjectStep): number {
    return item.id as number;
  }

  ngOnDestroy(): void {
    this.projectService.clearProject();
    this.projectStepService.clearProjectSteps();
    this.subject$.next(null);
    this.subject$.complete();
  }
}
