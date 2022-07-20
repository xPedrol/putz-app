import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {IProjectStep} from '../../../../models/project-step.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-initial-tab',
  templateUrl: './project-initial-tab.component.html',
  styleUrls: ['./project-initial-tab.component.scss']
})
export class ProjectInitialTabComponent implements OnInit,OnDestroy {
  project: IProject | undefined;
  projectStepTimeLine = false;
  projectSteps:IProjectStep[] | undefined;
  subject$ = new Subject();
  constructor(
    private projectService: ProjectService,
  ) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      this.project = project ?? undefined;
      if(this.project?.projectSteps){
        this.projectSteps = this.project?.projectSteps;
      }
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
