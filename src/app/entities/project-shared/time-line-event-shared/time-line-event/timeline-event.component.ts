import {Component, Input, OnInit} from '@angular/core';
import {IProjectStep} from '../../../../models/project-step.model';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';
import {ProjectStepService} from '../../../../services/project-step.service';
import {TimeLineEventService} from '../../../../services/time-line-event.service';
import {TimeLineCommentService} from '../../../../services/time-line-comment.service';
import {ITimeLineComment} from '../../../../models/time-line-comment.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {
  TimeLineEventUpdateDialogComponent
} from '../time-line-event-update-dialog/time-line-event-update-dialog.component';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ITimeLineAttachment} from '../../../../models/time-line-attachment.model';

@Component({
  selector: 'app-timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.scss']
})
export class TimelineEventComponent implements OnInit {
  @Input() projectStep: IProjectStep | undefined = undefined;
  @Input() timeLineEvents: ITimeLineEvent[] | undefined = undefined;
  withInput = false;

  //person/00--avatar-putz.jpg = Admin
  //person/00--freelancer.png = Freelancer
  //person/00--cliente.jpg = Cliente
  //person/00--manager.jpg = Manager

  constructor(
    private projectStepService: ProjectStepService,
    private timeLineEventService: TimeLineEventService,
    private timeLineCommentService: TimeLineCommentService,
    private toastService: NbToastrService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    this.withInput = !!(this.projectStep && this.timeLineEvents);
    if (!this.withInput) {
      this.getByBehaviorSubject();
    }
  }

  getByBehaviorSubject() {
    this.projectStepService.projectStep$.subscribe(projectStep => {
      if (projectStep) {
        this.projectStep = projectStep;
      }
    });
    this.timeLineEventService.timeLineEvents$.subscribe(req => {
      if (req && req!.timeLineEvents) {
        this.timeLineEvents = req.timeLineEvents;
      }
    });
  }

  updateCommentsByEvent(eventId: number | undefined): void {
    if (eventId) {
      const ids = {
        projectId: this.projectStep?.project?.id,
        projectStepId: this.projectStep?.id,
        eventId
      };
      const index = this.timeLineEventService.getEventIndexById(eventId, this.timeLineEvents);
      this.timeLineCommentService.queryWithIds(ids).subscribe(({timeLineComments}) => {
        // @ts-ignore
        if (index >= 0 && this.timeLineEvents && this.timeLineEvents[index] && timeLineComments) {
          // @ts-ignore
          this.timeLineEvents[index].comments = timeLineComments;
        }
      });

    }
  }

  createComment(input: HTMLInputElement, eventId: number | undefined): void {
    const commentDescription = input.value;
    if (eventId && (commentDescription && commentDescription !== '')) {
      const comment: ITimeLineComment = {
        description: commentDescription,
        isVisible: true
      };
      const ids = {
        projectId: this.projectStep?.project?.id,
        projectStepId: this.projectStep?.id,
        eventId
      };
      this.timeLineCommentService.createWithIds(comment, ids).subscribe(comment => {
        const index = this.timeLineEventService.getEventIndexById(eventId, this.projectStep?.events);
        // @ts-ignore
        if (index >= 0 && (this.timeLineEvents && this.timeLineEvents[index])) {
          // @ts-ignore
          if (!this.timeLineEvents[index].comments) {
            // @ts-ignore
            this.timeLineEvents[index].comments = [];
          }
          // @ts-ignore
          this.timeLineEvents[index].comments?.push(comment);
          this.toastService.show('', 'Comentário criado com sucesso', {status: 'success'});
          input.value = '';
        }
      });
    }
  }

  deleteComment(eventId: number | undefined, commentId: number | undefined): void {
    if (commentId && eventId) {
      const ids = {
        projectId: this.projectStep?.project?.id,
        projectStepId: this.projectStep?.id,
        eventId,
        commentId
      };

      this.timeLineCommentService.deleteByIds(ids).subscribe(() => {
        const eventIndex = this.timeLineEventService.getEventIndexById(eventId, this.projectStep?.events);
        // @ts-ignore
        if (eventIndex >= 0 && this.timeLineEvents && this.timeLineEvents[eventIndex]) {
          // @ts-ignore
          const commentIndex = this.timeLineCommentService.getCommentIndexById(commentId, this.timeLineEvents[eventIndex]?.comments);
          // @ts-ignore
          if (commentIndex >= 0 && (this.timeLineEvents && this.timeLineEvents[commentIndex])) {
            // @ts-ignore
            this.timeLineEvents[eventIndex].comments?.splice(commentIndex, 1);
          }
        }
        this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
      });

    }
  }

  openTimeLineEventDetailDialog(event: ITimeLineEvent | undefined = undefined): void {
    this.dialogService.open(TimeLineEventUpdateDialogComponent, {
      context: {
        projectStep: this.projectStep,
        event
      },
    }).onClose.subscribe(res => {
      this.handleEventsRequest(this.timeLineEventService.queryWithIds({
        projectId: this.projectStep?.project?.id,
        stepId: this.projectStep?.id
      }));
    });
  }

  deleteEvent(eventId: number | undefined): void {
    if (eventId) {
      const ids = {projectId: this.projectStep?.project?.id, stepId: this.projectStep?.id, eventId};
      this.handleEventsRequest(this.timeLineEventService.deleteWithIds(ids).pipe(mergeMap(() => {
        this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
        const ids = {
          projectId: this.projectStep?.project?.id,
          stepId: this.projectStep?.id
        };
        return this.timeLineEventService.queryWithIds(ids);
      })));
    }
  }
  trackByFn(index: number, item: ITimeLineEvent): number {
    return item.id as number;
  }
  trackCommentsByFn(index: number, item: ITimeLineComment): number {
    return item.id as number;
  }

  trackAttachmentsByFn(index: number, item: ITimeLineAttachment): number {
    return item.id as number;
  }
  handleEventsRequest(eventsObservable: Observable<ITimeLineEvent[]>): void {
    eventsObservable.subscribe((timeLineEvents) => {
      this.timeLineEvents = timeLineEvents || [];
    });
  }
}
