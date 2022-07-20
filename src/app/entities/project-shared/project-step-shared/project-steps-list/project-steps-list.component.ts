import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectStepService} from '../../../../services/project-step.service';
import {IProjectStep} from '../../../../models/project-step.model';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-steps-list',
  templateUrl: './project-steps-list.component.html',
  styleUrls: ['./project-steps-list.component.scss']
})
export class ProjectStepsListComponent implements OnInit, OnDestroy {
  projectSteps: IProjectStep[] | undefined;
  project: IProject | undefined;
  subject$ = new Subject();

  constructor(
    private projectStepsService: ProjectStepService,
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project || undefined;
      }
    });
    this.projectStepsService.projectSteps$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req && req.projectSteps) {
        this.projectSteps = req.projectSteps || [];
      }
    });
  }

  trackByFn(index: number, item: IProjectStep): number {
    return item.id as number;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
