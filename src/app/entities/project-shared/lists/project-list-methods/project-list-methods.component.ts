import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from '../../../../models/project.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export interface IProjectOutput {
  competence: {
    ancient?: IProject,
    current?: IProject
  },
  action: string;
}

@Component({
  selector: 'app-project-list-methods',
  template: `
  `,
  styles: []
})
export class ProjectListMethodsComponent implements OnInit, OnDestroy {
  subject$: Subject<any>;

  constructor(
    public projectService: ProjectService,
    public toastService: NbToastrService,
    public dialogService: NbDialogService
  ) {
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
  }

  approveBriefing(project: IProject | any): void {
    const projectId = project?.id;
    if (projectId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Projeto: ${project?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((proceed) => {
        if (proceed) {
          this.projectService.approveBriefing(projectId).pipe(takeUntil(this.subject$)).subscribe((newProject) => {
            this.onProjectsChange({competence: {ancient: project, current: newProject}, action: 'UPDATE'});
            this.toastService.show('', 'Aprovado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  approveConception(project: IProject | any): void {
    const projectId = project?.id;
    if (projectId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Projeto: ${project?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((proceed) => {
        if (proceed) {
          this.projectService.approveConception(projectId).pipe(takeUntil(this.subject$)).subscribe((newProject) => {
            this.onProjectsChange({competence: {ancient: project, current: newProject}, action: 'UPDATE'});
            this.toastService.show('', 'Aprovado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  deleteProject(project: IProject | any): void {
    const projectId = project?.id;
    if (projectId && project) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.DELETE,
          msg: `Projeto ${project?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.projectService.delete(projectId).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.onProjectsChange({competence: {ancient: project}, action: 'DELETE'});
            this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  closeProject(project: IProject | any): void {
    const projectId = project?.id;
    if (projectId && project) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Projeto ${project?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.projectService.closeProject(project.id).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.onProjectsChange({competence: {ancient: project}, action: 'UPDATE'});
            this.toastService.show('', 'Fechado com sucesso', {status: 'success'});
          });
        }
      });
    }
  }

  cancelConception(project: IProject | any): void {
    const projectId = project?.id;
    if (projectId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Projeto: ${project?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((proceed) => {
        if (proceed) {
          this.projectService.cancelConception(projectId).pipe(takeUntil(this.subject$)).subscribe((newProject) => {
            this.onProjectsChange({competence: {ancient: project, current: newProject}, action: 'UPDATE'});
            this.toastService.show('', 'Cancelado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  cancelBriefing(project: IProject | any): void {
    const projectId = project?.id;
    if (projectId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Projeto: ${project?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((proceed) => {
        if (proceed) {
          this.projectService.cancelBriefing(projectId).pipe(takeUntil(this.subject$)).subscribe((newProject) => {
            this.onProjectsChange({competence: {ancient: project, current: newProject}, action: 'UPDATE'});
            this.toastService.show('', 'Cancelado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  onProjectsChange({competence, action}: IProjectOutput): void {
    if (competence && action) {
      let index: number | null = null;
      const projects: IProject[] | undefined = this.projectService.projects$.getValue()?.projects;
      switch (action) {
        case 'DELETE':
          if (competence.ancient?.id) {
            index = this.projectService.getProjectIndexById(competence.ancient.id, projects);
            if (typeof index === 'number' && projects) {
              projects.splice(index, 1);
              const size = this.projectService.totalCount$.getValue() - 1;
              this.projectService.totalCount$.next(size);
            }
          }
          break;
        case 'UPDATE':
          if (competence.ancient?.id) {
            index = this.projectService.getProjectIndexById(competence.ancient.id, projects);
            if (typeof index === 'number' && projects && competence?.current) {
              projects[index] = competence.current;
            }
          }
          break;
      }
      if (projects) {
        this.projectService.setProjects({projects});
      }
      // this.getTimeLineEvents();
    }
  }

  trackById(index: number, project: IProject): number {
    return project.id as number;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
