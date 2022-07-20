import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {IProjectStep} from '../../../../models/project-step.model';
import {TimeLineEventService} from '../../../../services/time-line-event.service';
import {TimeLineAttachmentService} from '../../../../services/time-line-attachment.service';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {ITimeLineAttachment} from '../../../../models/time-line-attachment.model';
import {ProjectService} from '../../../../services/project.service';
import {HttpHeaders} from '@angular/common/http';
import {ProjectStepService} from '../../../../services/project-step.service';
import {TimeLineEventUpdateFormComponent} from "../time-line-event-update-form/time-line-event-update-form.component";

@Component({
  selector: 'app-time-line-event-detail-dialog',
  templateUrl: './time-line-event-update-dialog.component.html',
  styleUrls: ['./time-line-event-update-dialog.component.scss'],
  providers: [
    TimeLineAttachmentService,
    TimeLineEventService
  ]
})
export class TimeLineEventUpdateDialogComponent implements OnInit, OnDestroy {
  @ViewChild('eventUpdateFormComponent', {static: true}) eventUpdateForm: TimeLineEventUpdateFormComponent;
  projectStep: IProjectStep | undefined;
  event: ITimeLineEvent | undefined;
  attachments: ITimeLineAttachment[] | undefined;
  submitting: BehaviorSubject<boolean>;
  isRequest: boolean = false;
  justAttachments = false;
  subject$ = new Subject();

  constructor(
    private dialogRef: NbDialogRef<TimeLineEventUpdateDialogComponent>,
    private timeLineEventService: TimeLineEventService,
    private timeLineAttachmentService: TimeLineAttachmentService,
    private toastService: NbToastrService,
    private projectService: ProjectService,
    private projectStepService: ProjectStepService
  ) {
    this.submitting = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    if (this.event) {
      this.timeLineAttachmentService.setTimeLineAttachments({
        timeLineAttachments: this.attachments || [],
        headers: new HttpHeaders()
      });
      this.timeLineEventService.setTimeLineEvent(this.event);
    }
    // this.projectStepService.projectStep$.subscribe(step => {
    //   console.warn(step);
    // });
  }

  close(res: any = {}): void {
    // this.dialogRef.close(res);
    this.dialogRef.close(res);
  }

  save(): void {
    const timeLineEvent = this.eventUpdateForm.validateAndGetRaw();
    if (timeLineEvent) {
      this.submitting.next(true);
      const ids: any = {
        projectId: this.projectService?.project?.id,
        stepId: this.projectStep?.id,
        eventId: timeLineEvent?.id ?? null
      };
      const files: Set<File> = timeLineEvent.files;
      const links: Set<ITimeLineAttachment> = timeLineEvent.links;
      if (!this.justAttachments) {
        timeLineEvent.files = undefined;
        timeLineEvent.projectStep = {id: this.projectStep?.id};
        let eventToEmit: ITimeLineEvent | undefined;
        this.getEventRequestType(timeLineEvent, ids).pipe(mergeMap((event) => {
          eventToEmit = event;
          this.toastService.show('', `Evento ${event?.title} salvo com sucesso`, {status: 'success'});
          ids.eventId = event?.id;
          return this.getFilesObservables(files, links, ids);
        })).pipe(takeUntil(this.subject$)).subscribe((data) => {
          data.forEach((attachment) => {
            this.toastService.show('', `Anexo ${attachment?.name} salvo com sucesso`, {status: 'success'});
          });
          this.submitting.next(false);
          this.close({...this.event, ...eventToEmit});
        }, () => {
          this.submitting.next(false);
        });
      } else {
        this.saveOnlyAttachments(files, links, ids);
      }
    }
  }

  saveOnlyAttachments(files: Set<File>, links: Set<ITimeLineAttachment>, ids: any): void {
    this.getFilesObservables(files, links, ids).pipe(takeUntil(this.subject$)).subscribe((data) => {
      data.forEach((attachment) => {
        this.toastService.show('', `Anexo ${attachment?.name} salvo com sucesso`, {status: 'success'});
      });
      this.submitting.next(false);
      this.close({refreshAttachments: true});
    }, () => {
      this.submitting.next(false);
    });
  }

  getFilesObservables(files: Set<File>, links: Set<ITimeLineAttachment>, ids: any): Observable<ITimeLineAttachment[]> {
    const fileObservables: Observable<ITimeLineAttachment>[] = [];
    if (files && files.size > 0) {
      files.forEach(file => [
        fileObservables.push(this.timeLineAttachmentService.createByFreelancer(file, ids))
      ]);
      return combineLatest(fileObservables);
    } else if (links && links.size > 0) {
      links.forEach(link => [
        fileObservables.push(this.timeLineAttachmentService.createByFreelancerWithLink(link, ids))
      ]);
      return combineLatest(fileObservables);
    } else {
      return of([]);
    }
  }

  ngOnDestroy(): void {
    this.timeLineEventService.clearTimeLineEvent();
    this.timeLineAttachmentService.clearTimeLineAttachments();
    this.subject$.next(null);
    this.subject$.complete();

  }

  getEventRequestType(timeLineEvent: any, ids: any): Observable<ITimeLineEvent> {
    if (timeLineEvent?.id) {
      return this.timeLineEventService.patchUpdate(ids, timeLineEvent);
    } else {
      return this.timeLineEventService.createByFreelancer(timeLineEvent, ids);
    }
  }


}
