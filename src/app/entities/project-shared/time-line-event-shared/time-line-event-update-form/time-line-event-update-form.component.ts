import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  EventType,
  eventTypeArray,
  eventTypeForFreelancer,
  eventTypeWithoutRequestArray
} from '../../../../models/enums/event-type.model';
import {TimeLineEventService} from '../../../../services/time-line-event.service';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';
import {TimeLineAttachmentService} from '../../../../services/time-line-attachment.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {ITimeLineAttachment, TimeLineAttachment} from '../../../../models/time-line-attachment.model';
import {IProjectItem} from '../../../../models/project-item.model';
import {ProjectService} from '../../../../services/project.service';
import {ProjectItemService} from '../../../../services/project-item.service';
import {IProject} from '../../../../models/project.model';
import {takeUntil} from 'rxjs/operators';
import {AccountService} from '../../../../services/account.service';
import {Authority} from '../../../../constants/authority.constants';
import {ProjectStepService} from '../../../../services/project-step.service';
import {IProjectStep} from '../../../../models/project-step.model';
import {FileSizeWarningComponent} from '../../../../shared/components/file-size-warning/file-size-warning.component';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'app-time-line-event-update-form',
  templateUrl: './time-line-event-update-form.component.html',
  styleUrls: ['./time-line-event-update-form.component.scss', '../../../../shared/themes/dropzone.scss']
})
export class TimeLineEventUpdateFormComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  editForm: FormGroup;
  project: IProject | undefined;
  @Input() projectStep: IProjectStep | undefined;
  eventTypes: EventType[] = eventTypeArray;
  eventType = EventType;
  projectItems: IProjectItem[] | undefined;
  timeLineEvent: ITimeLineEvent | undefined;
  attachments: ITimeLineAttachment[] | undefined;
  fileViewTable = false;
  @Input() submitting: BehaviorSubject<boolean> | undefined;
  @Input() isRequest: boolean = false;
  isTopic: boolean = false;
  @Input() justAttachments: boolean = false;
  commonSubmitting = false;
  linkInput: FormControl;
  maxFileSize = 50000000;

  constructor(
    private timeLineEventService: TimeLineEventService,
    private timeLineAttachmentService: TimeLineAttachmentService,
    private projectService: ProjectService,
    private projectStepService: ProjectStepService,
    private projectItemService: ProjectItemService,
    private accountService: AccountService,
    private dialogService: NbDialogService
  ) {
    this.linkInput = new FormControl(null, [Validators.required]);
    this.editForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      files: new FormControl(new Set([]), [Validators.required]),
      rootEvent: new FormControl(null),
      eventType: new FormControl(null),
      links: new FormControl(new Set<ITimeLineAttachment>([])),
      projectItemId: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.accountService.accountSubject.pipe(takeUntil(this.subject$)).subscribe(account => {
      if (account?.notHasAnyAuthority([Authority.ADMIN, Authority.MANAGER, Authority.VENDOR, Authority.FREELANCER])) {
        this.eventTypes = [EventType.TOPIC];
      } else if (account?.hasOnlyAuthority([Authority.FREELANCER])) {
        this.eventTypes = eventTypeForFreelancer;
      } else {
        if (this.isRequest) {
          this.timeLineAttachmentService.clearTimeLineAttachments();
        } else {
          this.eventTypes = eventTypeWithoutRequestArray;
        }
      }
    });
    this.editForm.get('eventType')?.valueChanges.pipe(takeUntil(this.subject$)).subscribe(value => {
      this.editForm.get('projectItemId')?.removeValidators([Validators.required]);
      switch (value) {
        case EventType.TOPIC:
          this.isTopic = true;
          this.editForm.get('projectItemId')?.disable();
          break;
        case EventType.PARTIAL:
          this.editForm.get('projectItemId')?.setValidators([Validators.required]);
          break;
        default:
          this.isTopic = false;
          this.editForm.get('projectItemId')?.enable();
          break;
      }
      this.editForm.get('projectItemId')?.updateValueAndValidity();
    });
    this.submitting?.pipe(takeUntil(this.subject$)).subscribe(submitting => {
      if (!submitting) {
        this.editForm.markAsUntouched({onlySelf: false});
      }
      this.commonSubmitting = submitting ?? false;
    });
    this.timeLineEventService.timeLineEvent$.pipe(takeUntil(this.subject$)).subscribe(event => {
      if (event) {
        this.timeLineEvent = event;
        this.fileViewTable = true;
        this.updateForm(this.timeLineEvent);
      }
    });
    this.timeLineAttachmentService.timeLineAttachments$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req && req!.timeLineAttachments) {
        this.attachments = req!.timeLineAttachments ?? [];
      }
    });
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
      }
    });
    this.getProjectItems();
    // this.projectItemService.projectItems$.pipe(distinctUntilChanged(), takeUntil(this.subject$)).subscribe((res) => {
    //   if (res?.projectItems) {
    //     this.projectItems = res.projectItems;
    //   } else {
    //     this.getProjectItems();
    //   }
    // });
  }


  onFileSelect(event: any) {
    if ((event.addedFiles[0] as File).size > this.maxFileSize) {
      this.dialogService.open(FileSizeWarningComponent, {
        context: {
          file: event.addedFiles[0],
          maxFileSize: this.maxFileSize
        }
      });
    } else {
      const files: Set<File> = this.editForm.get('files')?.value;
      files.add(event.addedFiles[0]);
      this.editForm.get('files')?.setValue(files);
    }
  }

  onFileRemove(file: any) {
    const files: Set<File> = this.editForm.get('files')?.value;
    files.delete(file);
    this.editForm.get('files')?.setValue(files);
  }

  onLinkSelect() {
    if (this.linkInput.invalid) {
      this.linkInput.markAsTouched();
    } else {
      const inputValue = this.linkInput.value.trim();
      if (inputValue.length > 0) {
        const links: Set<ITimeLineAttachment> = this.editForm.get('links')?.value;
        if (!links.has(inputValue)) {
          const attachment = new TimeLineAttachment();
          attachment.link = inputValue;
          attachment.name = inputValue;
          attachment.setExtension(inputValue);
          links.add(attachment);
          this.editForm.get('links')?.setValue(links);
          const attachments = this.timeLineAttachmentService.timeLineAttachments$.getValue()?.timeLineAttachments ?? [];
          attachments?.push(attachment);
          this.timeLineAttachmentService.timeLineAttachments$.next({
            timeLineAttachments: attachments
          });
          this.linkInput.reset();
        }
      } else {
        this.linkInput.reset();
      }
    }
  }

  onLinkRemove(attachment: ITimeLineAttachment) {
    const attachments = new Set(this.timeLineAttachmentService.timeLineAttachments$.getValue()?.timeLineAttachments ?? []);
    attachments.delete(attachment);
    this.timeLineAttachmentService.timeLineAttachments$.next({
      timeLineAttachments: Array.from(attachments)
    });
    const links: Set<string> = this.editForm.get('links')?.value;
    links.delete(attachment.link ?? '');
    this.editForm.get('links')?.setValue(links);
  }

  validateAndGetRaw(): any {
    if (this.editForm.valid && !this.justAttachments) {
      return this.getForm();
    } else if (this.justAttachments && (this.editForm.get('files')?.value || this.editForm.get('links')?.value)) {
      return this.getForm();
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  getForm(): ITimeLineEvent {
    const eventForm = this.editForm.getRawValue();
    eventForm.projectItem = eventForm.projectItemId ? {id: eventForm.projectItemId} : undefined;
    eventForm.projectItemId = undefined;

    return eventForm;
  }

  updateForm(event: ITimeLineEvent): void {
    this.editForm.get('projectItemId')?.setValue(event.projectItem?.id);
    if (!this.isRequest) {
      this.editForm.get('id')?.setValue(event.id);
      this.editForm.get('title')?.setValue(event.title);
      this.editForm.get('description')?.setValue(event.description);
      this.editForm.get('eventType')?.setValue(event.eventType, {emitEvent: true});
      this.editForm.get('rootEvent')?.setValue(event.rootEvent);
    }
    if (this.isRequest) {
      this.editForm.get('eventType')?.setValue(EventType.COMMIT);
      this.editForm.get('eventType')?.disable();
      this.editForm.get('rootEvent')?.setValue(event);
    }
  }

  getProjectItems(): void {
    if (this.project?.id) {
      const ids = {
        projectId: this.project?.id,
        stepId: this.projectStep?.id
      };
      this.projectItemService.queryByProjectIdAndStepId(ids.projectId, ids.stepId, null, false).pipe(takeUntil(this.subject$)).subscribe(({projectItems}) => {
        if (projectItems) {
          this.projectItems = projectItems;
          if (this.projectItems && this.projectItems.length === 0) {
            this.editForm.get('projectItemId')?.setValue(this.projectItems[0].id);
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
