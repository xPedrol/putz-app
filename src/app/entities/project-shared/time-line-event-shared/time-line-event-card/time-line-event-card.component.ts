import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';
import {combineLatest, Observable, Subject} from 'rxjs';
import {TimeLineEventService} from '../../../../services/time-line-event.service';
import {ProjectService} from '../../../../services/project.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {
  TimeLineEventUpdateDialogComponent
} from '../time-line-event-update-dialog/time-line-event-update-dialog.component';
import {ITimeLineAttachment} from '../../../../models/time-line-attachment.model';
import {ITimeLineComment} from '../../../../models/time-line-comment.model';
import {queryType as commentQueryType, TimeLineCommentService} from '../../../../services/time-line-comment.service';
import {
  queryType as attachmentQueryType,
  TimeLineAttachmentService
} from '../../../../services/time-line-attachment.service';
import * as moment from 'moment';
import {Moment} from 'moment';
import {AccountService} from '../../../../services/account.service';
import {ConfirmDialogComponent} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../../constants/dialog-action.constants';
import {takeUntil} from 'rxjs/operators';
import {
  TimeLineEventEvaluationDialogComponent
} from '../time-line-event-evaluation-dialog/time-line-event-evaluation-dialog.component';
import {ITimeLineEventEvaluation} from '../../../../models/time-line-event-evaluation.model';
import {Authority} from '../../../../constants/authority.constants';
import {ProjectStepService} from '../../../../services/project-step.service';
import {IProjectStep} from '../../../../models/project-step.model';

export interface timeLineEventOutput {
  event: ITimeLineEvent | undefined,
  action: string;
}

export interface timeLineCommentOutput {
  comment: ITimeLineComment | undefined,
  action: string;
}

@Component({
  selector: 'app-time-line-event-card',
  templateUrl: './time-line-event-card.component.html',
  styleUrls: [
    './time-line-event-card.component.scss',
    '../../../../shared/themes/star-rating.scss',
    '../../../../shared/themes/common.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    TimeLineCommentService,
    TimeLineAttachmentService,
    TimeLineEventService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeLineEventCardComponent implements OnInit, OnDestroy {
  @Input() event: ITimeLineEvent | undefined;
  attachments: ITimeLineAttachment[] | undefined;
  comments: ITimeLineComment[] | undefined;
  replyMsg: ITimeLineComment | undefined;
  @Output() request: EventEmitter<timeLineEventOutput>;
  subject$ = new Subject();
  authority = Authority;
  projectStep: IProjectStep | undefined;
  gotAttachments = false;
  loadingAttachments = false;
  gotComments = false;
  loadingComments = false;
  cannotMakeChanges = false;
  makingComment = false;

  constructor(
    private timeLineEventService: TimeLineEventService,
    private timeLineCommentService: TimeLineCommentService,
    private timeLineAttachmentService: TimeLineAttachmentService,
    private projectService: ProjectService,
    private projectStepService: ProjectStepService,
    private toastService: NbToastrService,
    private dialogService: NbDialogService,
    public accountService: AccountService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.request = new EventEmitter<timeLineEventOutput>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    combineLatest([
      this.projectService.project$,
      this.projectStepService.projectStep$
    ]).pipe(takeUntil(this.subject$)).subscribe(([project, projectStep]) => {
      if (projectStep) {
        this.projectStep = projectStep;
        if (this.projectStep.isCurrent) {
          this.getComments();
          this.getAttachments();
        }
      }
      this.cannotMakeChanges = (projectStep?.changeNumber ?? 0) >= (project?.changeMaxNumber ?? 0);
    });
    // this.projectStepService.projectStep$.pipe(takeUntil(this.subject$)).subscribe(step => {
    //   if (step) {
    //     this.projectStep = step;
    //     if (this.projectStep.isCurrent) {
    //       this.getComments();
    //       this.getAttachments();
    //     }
    //   }
    // });
  }

  getComments(): void {
    this.gotComments = true;
    this.loadingComments = true;
    this.handleCommentsRequest(this.timeLineCommentService.queryWithIds(this.getIds(), false));
  }

  getAttachments(): void {
    this.gotAttachments = true;
    this.loadingAttachments = true;
    this.handleAttachmentsRequest(this.timeLineAttachmentService.queryWithIds(this.getIds(), false));
  }

  handleDeleteEventRequest(eventsObservable: Observable<{}>): void {
    eventsObservable.pipe(takeUntil(this.subject$)).subscribe(() => {
      this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
      //EMIT
      this.request.emit({event: this.event, action: 'DELETE'});
    });
  }

  handleCommentsRequest(eventsObservable: Observable<commentQueryType>): void {
    eventsObservable.pipe(takeUntil(this.subject$)).subscribe((req) => {
      if (req && req.timeLineComments) {
        this.comments = req.timeLineComments;
      }
    }).add(() => {
      this.loadingComments = false;
      this.changeDetector.markForCheck();
    });
  }

  handleAttachmentsRequest(eventsObservable: Observable<attachmentQueryType>): void {
    eventsObservable.pipe(takeUntil(this.subject$)).subscribe((req) => {
      if (req && req.timeLineAttachments) {
        this.attachments = req.timeLineAttachments;
      }
    }).add(() => {
      this.loadingAttachments = false;
      this.changeDetector.markForCheck();
    });
  }

  openTimeLineEventDetailDialog(isRequest = false, justAttachments = false): void {
    if (this.event?.projectStep && (((!this.event?.conclusionDate && this.event?.isVisible) || isRequest) || this.accountService.account?.hasAnyAuthority([Authority.ADMIN, Authority.MANAGER]))) {
      const attachments = this.attachments ? [...this.attachments] : [];
      this.dialogService.open(TimeLineEventUpdateDialogComponent, {
        context: {
          projectStep: this.event?.projectStep,
          event: this.event,
          attachments,
          isRequest,
          justAttachments
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe((obj: any) => {
        //EMIT
        if (obj['refreshAttachments']) {
          this.getAttachments();
        } else if (this.event?.id && !isRequest) {
          this.request.emit({event: obj, action: 'UPDATE'});
        } else if (isRequest) {
          this.request.emit({event: obj, action: 'POST'});
        }
      });
    }
  }

  deleteEvent(): void {
    if (this.event && !((this.event?.conclusionDate || !this.event?.isVisible) && this.accountService.account?.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER]))) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.DELETE,
          msg: `Evento: ${this.event?.title}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe((proceed) => {
        if (proceed) {
          this.handleDeleteEventRequest(this.timeLineEventService.deleteWithIds(this.getIds()));
        }
      });
    }
  }

  createComment(input: HTMLInputElement): void {
    if (input.value !== '' && !(!this.event?.isVisible && this.accountService.account?.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER]))) {
      const commentDescription = input.value.trim();
      if ((commentDescription && commentDescription !== '' && commentDescription.length !== 0)) {
        const comment: ITimeLineComment = {
          description: commentDescription,
          isVisible: true,
          rootComment: this.replyMsg
        };
        this.makingComment = true;
        this.timeLineCommentService.createWithIds(comment, this.getIds()).pipe(takeUntil(this.subject$)).subscribe(comment => {

          this.toastService.show('', 'Comentário criado com sucesso', {status: 'success'});
          input.value = '';
          this.clearReply();
          this.onTimeLineCommentChange({comment, action: 'POST'});
          this.makingComment = false;
        }, () => {
          this.makingComment = false;
          this.changeDetector.markForCheck();
        });
      } else {
        input.value = '';
      }
    } else {
      input.value = '';
    }
  }

  getIds(commentReferId?: number): any {
    return {
      projectId: this.projectService?.project?.id,
      stepId: this.event?.projectStep?.id,
      eventId: this.event?.id,
      commentId: commentReferId ?? undefined
    };
  }

  createdDateToDate(momento: Moment | null | undefined): Date {
    if (momento) {
      return new Date();
    } else {
      const retorno: Moment = momento ?? moment();
      return new Date((retorno).format('dd/mm/yyyy'));
    }
  }

  deleteComment(comment: ITimeLineComment): void {
    if (comment && !((this.event?.conclusionDate || !this.event?.isVisible) && this.accountService.account?.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER]))) {
      this.timeLineCommentService.deleteByIds(this.getIds(comment.id)).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
        this.onTimeLineCommentChange({comment, action: 'DELETE'});
        // this.onCommentsChange();
      });
    }
  }

  changeCommentVisibility(commentToChange: ITimeLineComment): void {
    if (commentToChange && !(!this.event?.isVisible && this.accountService.account?.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER]))) {
      commentToChange.isVisible = !commentToChange?.isVisible;
      this.timeLineCommentService.updateWithIds(commentToChange, this.getIds(commentToChange.id)).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Editado com sucesso', {status: 'success'});
      });
    }
  }

  clearReply(): void {
    this.replyMsg = undefined;
  }

  choseReplyMsg(message: ITimeLineComment): void {
    this.replyMsg = message;
  }

  approveEvent(): void {
    if (!((this.event?.conclusionDate || !this.event?.isVisible) && this.accountService.account?.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER]))) {
      this.dialogService.open(TimeLineEventEvaluationDialogComponent, {
        context: {
          event: this.event,
          approve: true
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe((evaluation: ITimeLineEventEvaluation) => {
        if (evaluation) {
          this.timeLineEventService.approveEvent(this.getIds(), evaluation).pipe(takeUntil(this.subject$)).subscribe((obj) => {
            this.toastService.show('', 'Aprovado com sucesso', {status: 'success'});
            this.request.emit({event: obj, action: 'UPDATE'});
          });
        }
      });
    }
  }

  requestChange(): void {
    if (!((this.event?.conclusionDate || !this.event?.isVisible || this.cannotMakeChanges) && this.accountService.account?.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER]))) {
      this.dialogService.open(TimeLineEventEvaluationDialogComponent, {
        context: {
          event: this.event
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe((evaluation: ITimeLineEventEvaluation) => {
        if (evaluation) {
          this.timeLineEventService.declineEvent(this.getIds(), evaluation).pipe(takeUntil(this.subject$)).subscribe((obj) => {
            this.toastService.show('', 'Pedido de revisão enviado com sucesso', {status: 'success'});
            this.request.emit({event: obj, action: 'UPDATE'});
          });
        }
      });
    }
  }

  changeEventVisibility(): void {
    if (!((this.event?.conclusionDate || !this.event?.isVisible) && this.accountService.account?.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER]))) {
      const event: any = {
        id: this.event?.id,
        isVisible: !this.event?.isVisible
      };
      this.timeLineEventService.patchUpdate(this.getIds(), event).pipe(takeUntil(this.subject$)).subscribe((obj) => {
        this.toastService.show('', 'Visibilidade alterada com sucesso', {status: 'success'});
        this.request.emit({event: obj, action: 'UPDATE'});
      });
    }
  }

  onTimeLineCommentChange({comment, action}: timeLineCommentOutput): void {
    if (comment && action && comment?.id) {
      if (this.gotComments) {
        let index: number | null = null;
        switch (action) {
          case 'DELETE':
            index = this.timeLineCommentService.getCommentIndexById(comment?.id, this.comments);
            if (typeof index === 'number' && this.comments) {
              this.comments.splice(index, 1);
            }
            break;
          case 'POST':
            this.comments = this.comments ?? [];
            this.comments.push(comment);
            break;
        }
        this.changeDetector.markForCheck();
      } else {
        this.getComments();
      }
      // this.getTimeLineEvents();
    }
  }

  trackAttachmentsByFn(index: number, item: any): any {
    return item.id;
  }

  trackCommentsByFn(index: number, item: any): any {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
