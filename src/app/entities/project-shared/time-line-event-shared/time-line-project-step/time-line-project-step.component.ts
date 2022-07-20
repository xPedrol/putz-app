import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IProjectStep} from '../../../../models/project-step.model';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';
import {NbDialogService} from '@nebular/theme';
import {TimeLineEventService} from '../../../../services/time-line-event.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ProjectService} from '../../../../services/project.service';
import {timeLineEventOutput} from '../time-line-event-card/time-line-event-card.component';
import {IProject} from '../../../../models/project.model';
import {ProjectStepService} from '../../../../services/project-step.service';
import {takeUntil} from 'rxjs/operators';
import {Authority} from '../../../../constants/authority.constants';

@Component({
  selector: 'app-time-line-project-step',
  templateUrl: './time-line-project-step.component.html',
  styleUrls: ['./time-line-project-step.component.scss'],
  providers: [ProjectStepService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeLineProjectStepComponent implements OnInit, OnDestroy {
  @Input() project: IProject | undefined | null;
  @Input() projectStep: IProjectStep | undefined;
  @Input() refreshComponent$?: BehaviorSubject<boolean>;
  timeLineEvents: ITimeLineEvent[] | undefined;
  loadingTimeLIneEvents = false;
  subject$ = new Subject();
  authority = Authority;

  constructor(
    private dialogService: NbDialogService,
    private timeLineEventService: TimeLineEventService,
    private projectStepService: ProjectStepService,
    private projectService: ProjectService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    if (this.projectStep) {
      this.projectStepService.setProjectStep(this.projectStep);
    }
    this.getTimeLineEvents();
  }

  getTimeLineEvents(): void {
    if(this.project?.id && this.projectStep?.id){
    this.loadingTimeLIneEvents = true;
    this.handleEventsRequest(this.timeLineEventService.queryWithIds({
      projectId: this.projectService.project.id,
      stepId: this.projectStep.id
    }));
    }
  }

  handleEventsRequest(eventsObservable: Observable<ITimeLineEvent[]>): void {
    eventsObservable.pipe(takeUntil(this.subject$)).subscribe((timeLineEvents) => {
      this.timeLineEvents = timeLineEvents || [];
    }).add(() => {
      this.loadingTimeLIneEvents = false;
      this.changeDetectorRef.markForCheck();
    });
  }

  onTimeLineEventCardChange({event, action}: timeLineEventOutput): void {
    //this.projectStep.changeNumber++;
    //this.projectStepService.setProjectStep(this.projectStep);
    //this.projectStep = {...this.projectStep, ...event.projectStep}
    if (event && action && event?.id) {
      let index: number | null = null;
      switch (action) {
        case 'DELETE':
          index = this.timeLineEventService.getEventIndexById(event?.id, this.timeLineEvents);
          if (typeof index === 'number' && this.timeLineEvents) {
            this.timeLineEvents.splice(index, 1);
          }
          break;
        case 'UPDATE':
          index = this.timeLineEventService.getEventIndexById(event?.id, this.timeLineEvents);
          if (typeof index === 'number' && this.timeLineEvents) {
            this.timeLineEvents[index] = event;
          }
          break;
        case 'POST':
          this.timeLineEvents = this.timeLineEvents ?? [];
          this.timeLineEvents.unshift(event);
          break;
      }
      if (event?.projectStep?.changeNumber) {
        this.projectStep.changeNumber = event.projectStep.changeNumber;
        this.projectStepService.setProjectStep(this.projectStep)
      }
      this.changeDetectorRef.markForCheck();
      // this.getTimeLineEvents();
    }
  }

  trackTimeLineEventsByFn(index: number, item: ITimeLineEvent): number {
    return item.id as number;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
