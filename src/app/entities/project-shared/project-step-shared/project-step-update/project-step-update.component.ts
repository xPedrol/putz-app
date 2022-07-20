import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbTabComponent} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import {ProjectStepService} from '../../../../services/project-step.service';
import {IProjectStep} from '../../../../models/project-step.model';
import {Observable, Subject} from 'rxjs';
import {TimeLineEventService} from '../../../../services/time-line-event.service';
import {HttpHeaders} from '@angular/common/http';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-step-update',
  templateUrl: './project-step-update.component.html',
  styleUrls: ['./project-step-update.component.scss']
})
export class ProjectStepUpdateComponent implements OnInit, OnDestroy {
  projectStepId: number | undefined;
  projectStep: IProjectStep | undefined;
  subject$ = new Subject();
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectStepService: ProjectStepService,
    private timeLineEventService: TimeLineEventService
  ) {
  }

  ngOnInit(): void {
    this.projectStepId = this.activatedRoute.snapshot.params!.projectStepId;
    this.getProjectStep();
  }

  getProjectStep(): void {
    if (this.projectStepId) {
      this.projectHandle(this.projectStepService.find(this.projectStepId));
    }
  }

  changeTab(event: NbTabComponent): void {
    switch (event.tabId) {

    }
  }

  projectHandle(observable: Observable<IProjectStep>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe(projectStep => {
      this.projectStep = projectStep;
      if (this.projectStep?.events) {
        this.timeLineEventService.setTimeLineEvents({
          timeLineEvents: this.projectStep?.events,
          headers: new HttpHeaders()
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.projectStepService.clearProjectStep();
    this.timeLineEventService.clearTimeLineEvents();
    this.subject$.next(null);
    this.subject$.complete();
  }
}
