import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {IProjectStep} from '../../../../models/project-step.model';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {ProjectStepService} from '../../../../services/project-step.service';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';
import {
  TimeLineEventUpdateDialogComponent
} from '../time-line-event-update-dialog/time-line-event-update-dialog.component';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {timeLineEventOutput} from '../time-line-event-card/time-line-event-card.component';
import {Authority} from '../../../../constants/authority.constants';
import {AccountService} from '../../../../services/account.service';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-time-line-project-step-card',
  templateUrl: './time-line-project-step-card.component.html',
  styleUrls: ['./time-line-project-step-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeLineProjectStepCardComponent implements OnInit, OnDestroy {
  projectStep: IProjectStep | undefined;
  project: IProject | undefined;
  @Input() refreshComponent$?: BehaviorSubject<boolean>;
  @Input() isBegin = true;
  @Output() request: EventEmitter<timeLineEventOutput>;
  authority = Authority;
  subject$ = new Subject();
  cannotMakeChanges = false;

  constructor(
    private projectService: ProjectService,
    private projectStepService: ProjectStepService,
    private dialogService: NbDialogService,
    private accountService: AccountService,
    private toastService: NbToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.request = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    combineLatest([
      this.projectService.project$,
      this.projectStepService.projectStep$
    ]).pipe(takeUntil(this.subject$)).subscribe(([project, projectStep]) => {
      if (project) {
        this.project = project;
      }
      if (projectStep) {
        this.projectStep = projectStep;
      }
      this.cannotMakeChanges = (projectStep?.changeNumber ?? 0) >= (project?.changeMaxNumber ?? 0);
      this.changeDetectorRef.detectChanges();
    });
    // this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
    //
    // });
    // this.projectStepService.projectStep$.pipe(takeUntil(this.subject$)).subscribe(projectStep => {
    //
    // });
  }

  openTimeLineEventDetailDialog(event: ITimeLineEvent | undefined = undefined): void {
    if (this.projectStep?.isCurrent || this.accountService.account?.hasAnyAuthority([Authority.MANAGER, Authority.ADMIN])) {
      this.dialogService.open(TimeLineEventUpdateDialogComponent, {
        context: {
          projectStep: this.projectStep,
          event
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(res => {
        this.request.emit({event: res, action: 'POST'});
      });
    }
  }

  approveProjectStep(): void {
    if (this.projectStep?.isCurrent || this.accountService.account?.hasAnyAuthority([Authority.MANAGER, Authority.ADMIN])) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Etapa: ${this.projectStep?.name}`
        },
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed && this.projectStep) {
          this.projectStepService.approve(this.getIds()).pipe(takeUntil(this.subject$)).subscribe((res) => {
            if (res) {
              if (this.projectStep) {
                this.projectStep.isCurrent = false;
              }
              this.refreshComponent$?.next(true);
              this.toastService.show('', 'Etapa entregue com sucesso', {status: 'success'});
              this.changeDetectorRef.markForCheck();
            }
          });
        }
      });
    }
  }

  getIds(): any {
    return {
      projectId: this.project?.id,
      stepId: this.projectStep?.id
    };
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
