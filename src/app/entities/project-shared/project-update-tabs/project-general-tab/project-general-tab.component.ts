import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectStatus} from '../../../../models/enums/project-status.model';
import {takeUntil, tap} from 'rxjs/operators';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {Router} from '@angular/router';
import {combineLatest, Observable, Subject} from 'rxjs';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {IConceptionCreation} from '../../../../models/conception-creation.model';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {ProjectGeneralFormComponent} from '../../forms/project-general-form/project-general-form.component';
import {TranslateMessageService} from '../../../../services/translate-message.service';
import {
  ProjectConceptionCancelDialogComponent
} from '../../project-conception-cancel-dialog/project-conception-cancel-dialog.component';
import {AccountService} from '../../../../services/account.service';
import {Authority} from '../../../../constants/authority.constants';
import {IAccount} from "../../../../models/account.model";

@Component({
  selector: 'app-project-general-tab',
  templateUrl: './project-general-tab.component.html',
  styleUrls: ['./project-general-tab.component.scss']
})
export class ProjectGeneralTabComponent implements OnInit, OnDestroy {
  @ViewChild('projectGeneralForm', {static: true}) projectGeneralForm: ProjectGeneralFormComponent;
  project: IProject | undefined;
  subject$ = new Subject();
  projectStatus = ProjectStatus;
  canEdit = false;
  canClose = false;
  account: IAccount;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private toastService: NbToastrService,
    private dialogService: NbDialogService,
    private translateMessageService: TranslateMessageService,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    combineLatest([
      this.projectService.project$,
      this.accountService.accountSubject,
    ]).pipe(takeUntil(this.subject$)).subscribe(([project, account]) => {
      this.project = project ?? undefined;
      this.account = account ?? undefined;
      if (project && account) {
        if (account.notHasAnyAuthority([Authority.ADMIN])) {
          this.canEdit = project.canEdit;
          if (!account.hasOnlyAuthority([Authority.VENDOR])) {
            this.canClose = project.canClose;
          }
        } else {
          this.canEdit = true;
          this.canClose = true;
        }
      }
    });
  }

  handleGeneralForm(): void {
    const projectRaw = this.projectGeneralForm.validateAndGetRaw();
    if (projectRaw) {
      this.saveGeneralForm(projectRaw);
    }
  }

  closeProject(): void {
    if (this.project && this.project?.projectStatus !== ProjectStatus.MODEL) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Fechar projeto ${this.project?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe((procced) => {
        if (procced) {
          this.projectService.closeProject(this.project.id).subscribe({
            next: () => {
              this.router.navigateByUrl('/projects');
            },
            error: (err) => {
              this.translateMessageService.convertAndShowToast(err?.error?.message);
            }
          });
        }
      });
    }
  }

  saveGeneralForm(project: IConceptionCreation | IProject): void {
    const hasHighAuthority = this.account.hasHighAuthority();
    if (project) {
      const logic = () => {
        if (this.project.modelForConception) {
          this.projectService.createConception(project as IConceptionCreation).pipe(takeUntil(this.subject$)).subscribe((project) => {
            this.toastService.show('', `Projeto ${project?.name} criado com sucesso`, {status: 'success'});
            this.router.navigateByUrl(`/projects/${project?.id}`);
          });
        } else {
          if (project?.id) {
            const request = hasHighAuthority ? this.projectService.updateByAdmin(project as IProject) : this.projectService.updateProject(project as IProject);
            this.projectHandle(request.pipe(takeUntil(this.subject$), tap((project) => {
              this.toastService.show('', `Projeto ${project?.name} editado com sucesso`, {status: 'success'});
            })));
          } else {
            this.project!.projectStatus = ProjectStatus.MODEL;
          }
        }
      };
      if ('anyApproved' in project && project?.anyApproved) {
        this.dialogService.open(ConfirmDialogComponent, {
          context: {
            action: DialogAction.UPDATE,
            msg: `Esse projeto já foi aprovado.`
          }
        }).onClose.pipe(takeUntil(this.subject$)).subscribe((procced) => {
          if (procced) {
            logic();
          }
        });
      } else {
        logic();
      }
    }
  }

  projectHandle(observable: Observable<IProject>, modelForConception: boolean = false): void {
    observable.pipe(takeUntil(this.subject$)).subscribe(project => {
      project.modelForConception = modelForConception;
      this.project.modelForConception = modelForConception;
      // this.projectService.project$.next(this.projectService.convertProject(project));
    });
  }

  approveBriefing(): void {
    const projectId = this.project.id;
    if (projectId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Projeto: ${this.project.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((proceed) => {
        if (proceed) {
          this.projectService.approveBriefing(projectId).pipe(takeUntil(this.subject$)).subscribe((newProject) => {
            this.toastService.show('', 'Aprovado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  approveConception(): void {
    const projectId = this.project?.id;
    if (projectId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Projeto: ${this.project.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((proceed) => {
        if (proceed) {
          this.projectService.approveConception(projectId).pipe(takeUntil(this.subject$)).subscribe((newProject) => {
            this.toastService.show('', 'Aprovado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  cancelConception(): void {
    const projectId = this.project?.id;
    if (projectId) {
      this.dialogService.open(ProjectConceptionCancelDialogComponent, {
        context: {
          project: this.project
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((message: string | undefined) => {
        if (message !== undefined) {
          this.projectService.cancelConception(projectId, message).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.toastService.show('', 'Cancelado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  cancelBriefing(): void {
    const projectId = this.project?.id;
    if (projectId) {
      this.dialogService.open(ProjectConceptionCancelDialogComponent, {
        context: {
          project: this.project
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((message: string | undefined) => {
        if (message !== undefined) {
          this.projectService.cancelBriefing(projectId, message).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.toastService.show('', 'Cancelado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  resetBriefingToConception(): void {
    const projectId = this.project?.id;
    if (projectId) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Projeto: ${this.project.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(((proceed) => {
        if (proceed) {
          this.projectService.resetBriefingToConception(projectId).pipe(takeUntil(this.subject$)).subscribe((newProject) => {
            this.project = {...this.project, ...newProject};
            this.projectService.setProject(this.project);
            this.toastService.show('', 'Resetado com sucesso', {status: 'success'});
          });
        }
      }));
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
