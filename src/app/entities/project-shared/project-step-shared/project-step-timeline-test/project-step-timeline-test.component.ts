import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IProjectStep} from '../../../../models/project-step.model';
import {ProjectStepService} from '../../../../services/project-step.service';
import {IProject} from "../../../../models/project.model";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NbDialogService} from "@nebular/theme";
import {
  ProjectItemDetailDialogComponent
} from "../../project-item-shared/project-item-detail-dialog/project-item-detail-dialog.component";

@Component({
  selector: 'app-project-step-timeline-test',
  templateUrl: './project-step-timeline-test.component.html',
  styleUrls: ['./project-step-timeline-test.component.scss']
})
export class ProjectStepTimelineTestComponent implements OnInit, OnDestroy {
  @Input() project: IProject | undefined = undefined;
  @Input() projectSteps: IProjectStep[] | undefined = undefined;
  withInput = false;
  subject$ = new Subject();

  constructor(
    private projectStepsService: ProjectStepService,
    private dialogService: NbDialogService
  ) {

  }

  ngOnInit(): void {
    this.withInput = !!(this.projectSteps);
    if (!this.withInput) {
      this.getByBehaviorSubject();
    }
  }

  getByBehaviorSubject() {
    this.projectStepsService.projectSteps$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req && req.projectSteps) {
        this.projectSteps = req.projectSteps || [];
      }
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  trackByFn(index: number, item: IProjectStep) {
    return item.id;
  }

  openProjectItemDetailDialog(projectStep: IProjectStep) {
    this.dialogService.open(ProjectItemDetailDialogComponent,{context:{projectStep,project:this.project}});
  }
}
