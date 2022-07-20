import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProject} from '../../../../models/project.model';
import {IProjectStep} from '../../../../models/project-step.model';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {ProjectStepService} from '../../../../services/project-step.service';
import {ProjectService} from '../../../../services/project.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-step-dialog',
  templateUrl: './project-step-dialog.component.html',
  styleUrls: ['./project-step-dialog.component.scss']
})
export class ProjectStepDialogComponent implements OnInit, OnDestroy {
  projectStep: IProjectStep | undefined;
  project: IProject | undefined;
  subject$ = new Subject();

  constructor(
    private dialogRef: NbDialogRef<ProjectStepDialogComponent>,
    private projectStepService: ProjectStepService,
    private toastService: NbToastrService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
      } else if (this.projectStep?.project) {
        this.project = this.projectStep.project;
      }
    });
  }

  close(res: any = null): void {
    this.dialogRef.close(res);
  }

  save(projectStep: IProjectStep): void {
    const ids = {
      projectId: this.project?.id,
      stepId: projectStep?.id
    };
    if (this.project?.id) {
      this.projectStepService.update(projectStep, ids).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
        this.projectStep = {...this.projectStep, ...projectStep};
        this.close(this.projectStep);
      });
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
