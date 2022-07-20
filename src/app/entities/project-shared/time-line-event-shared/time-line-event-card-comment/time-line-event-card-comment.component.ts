import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ITimeLineComment} from '../../../../models/time-line-comment.model';
import {ProjectService} from '../../../../services/project.service';
import {TimeLineCommentService} from '../../../../services/time-line-comment.service';
import {NbToastrService} from '@nebular/theme';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-time-line-event-card-comment',
  templateUrl: './time-line-event-card-comment.component.html',
  styleUrls: ['./time-line-event-card-comment.component.scss']
})
export class TimeLineEventCardCommentComponent implements OnInit,OnDestroy {
  @Input() comment: ITimeLineComment | undefined;
  @Input() event: ITimeLineEvent | undefined;
  @Output() commentChanged: EventEmitter<any>;
  subject$ = new Subject();
  constructor(
    private projectService: ProjectService,
    private timeLineCommentService: TimeLineCommentService,
    private toastService: NbToastrService
  ) {
    this.commentChanged = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  deleteComment(): void {


    this.timeLineCommentService.deleteByIds(this.getIds()).pipe(takeUntil(this.subject$)).subscribe(() => {
      this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
      this.commentChanged.emit();
    });
  }

  changeVisibility(): void {
    if (this.comment) {
      this.comment.isVisible = !this.comment?.isVisible;
      this.timeLineCommentService.updateWithIds(this.comment, this.getIds()).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Editado com sucesso', {status: 'success'});
      });
    }
  }

  getIds(): any {
    return {
      projectId: this.projectService?.project?.id,
      stepId: this.event?.projectStep?.id,
      eventId: this?.event?.id,
      commentId: this.comment?.id
    };
  }
  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
