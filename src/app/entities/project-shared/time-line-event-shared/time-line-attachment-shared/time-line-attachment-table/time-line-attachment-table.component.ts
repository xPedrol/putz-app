import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TimeLineAttachmentService} from '../../../../../services/time-line-attachment.service';
import {ITimeLineAttachment} from '../../../../../models/time-line-attachment.model';
import {SortEvent} from '../../../../../directives/sortable.directive';
import {IState, State} from '../../../../../models/table/state.model';
import {ITableColumn} from '../../../../../models/table.model';
import {ITimeLineEvent} from '../../../../../models/time-line-event.model';
import {TimeLineEventService} from '../../../../../services/time-line-event.service';
import {NbToastrService} from '@nebular/theme';
import {ProjectService} from '../../../../../services/project.service';
import {IProject} from '../../../../../models/project.model';
import {HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-time-line-attachment-table',
  templateUrl: './time-line-attachment-table.component.html',
  styleUrls: ['./time-line-attachment-table.component.scss','../../../../../shared/themes/common.scss']
})
export class TimeLineAttachmentTableComponent implements OnInit,OnDestroy {
  subject$ = new Subject();
  @Output() stateChange: EventEmitter<IState> = new EventEmitter<IState>();
  @Output() linkRemoved: EventEmitter<ITimeLineAttachment> = new EventEmitter<ITimeLineAttachment>();
  @Input() defaultSize: number | undefined = 10;
  attachments: ITimeLineAttachment[] | undefined;
  event: ITimeLineEvent | undefined;
  project: IProject | undefined;
  state: IState | undefined;
  columns: ITableColumn[] = [
    {
      title: 'ID',
      name: 'id',
      class: 'text-md-start'
    },
    {
      title: 'Nome',
      name: 'name',
      class: 'text-md-start'
    },
    // {
    //   title: 'Link',
    //   name: 'link',
    //   class: 'text-md-start'
    // },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end'
    }
  ];

  constructor(
    private timeLineAttachmentService: TimeLineAttachmentService,
    private timeLineEventService: TimeLineEventService,
    private projectService: ProjectService,
    private toastService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    this.state = new State({
      page: 1,
      size: this.defaultSize,
      searchTerm: '',
      sortColumn: '',
      sortDirection: ''
    });
    this.getParams();
  }

  getParams(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
      }
    });
    this.timeLineEventService.timeLineEvent$.pipe(takeUntil(this.subject$)).subscribe(event => {
      if (event) {
        this.event = event;
      }
    });
    this.timeLineAttachmentService.timeLineAttachments$.pipe(takeUntil(this.subject$)).subscribe((req) => {
      if (req && req.timeLineAttachments) {
        this.attachments = req.timeLineAttachments;
      }
    });
  }

  onSort(sortEvent: SortEvent) {
    this.state!.setSortParams(sortEvent);
    this.stateChange.emit(this.state?.getQuery);

  }

  pageChange(event: number): void {
    this.state!.page = event;
    this.stateChange.emit(this.state?.getQuery);
    // this.updateStateSubject();
  }

  sizeChange(event: number): void {
    this.state!.size = event;
    this.stateChange.emit(this.state?.getQuery);
    // this.updateStateSubject();
  }

  deleteAttachment(attachment: ITimeLineAttachment): void {
    if (attachment.id) {
      const ids = {
        projectId: this.project?.id,
        stepId: this.event?.projectStep?.id,
        eventId: this.event?.id,
        attachmentId: attachment.id
      };
      this.timeLineAttachmentService.deleteWithIds(ids).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
        this.deleteAttachmentFromArray(attachment);
      });
    } else {
      this.deleteAttachmentFromArray(attachment);
      this.linkRemoved.emit(attachment);
    }
  }

  deleteAttachmentFromArray(attachment: ITimeLineAttachment): void {
    const attachments: Set<ITimeLineAttachment> = new Set<ITimeLineAttachment>(this.attachments);
    attachments.delete(attachment);
    this.timeLineAttachmentService.timeLineAttachments$.next({
      timeLineAttachments: Array.from(attachments),
      headers: new HttpHeaders()
    });
  }

  trackById(index: number, item: ITimeLineAttachment): number {
    return item.id as number;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
