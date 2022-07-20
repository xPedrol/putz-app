import * as moment from 'moment';
import {Moment} from 'moment';
import {IProjectStep} from './project-step.model';
import {IProjectItem} from './project-item.model';
import {IProjectStepChange} from './project-step-change.model';
import {ITimeLineAttachment, TimeLineAttachment} from './time-line-attachment.model';
import {ITimeLineComment, TimeLineComment} from './time-line-comment.model';
import {EventType} from './enums/event-type.model';
import {ProjectStatus} from './enums/project-status.model';

export interface ITimeLineEvent {
  id?: number;
  title?: string;
  eventType?: EventType;
  description?: string | null;
  isVisible?: boolean | null;
  isActive?: boolean | null;
  conclusionDate?: Moment | null;
  conclusionTitle?: string | null;
  customerRate?: number | null;
  conclusionDescription?: string | null;
  cenaDescriptions?:any[] | null;
  isApproved?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  rootEvent?: ITimeLineEvent | null;
  rootEventId?: number | null;
  changes?: IProjectStepChange[] | null;
  attachments?: ITimeLineAttachment[] | null;
  comments?: ITimeLineComment[] | null;
  projectStep?: IProjectStep | null;
  productItems?: IProjectItem[] | null;
  projectItem?: IProjectItem | null;

  timeLineCommentsWithClass(comments: ITimeLineComment[]): ITimeLineComment[];

  timeLineAttachmentsWithClass(attachments: ITimeLineAttachment[]): ITimeLineAttachment[];
}

export class TimeLineEvent implements ITimeLineEvent {
  id: number;
  title: string;
  eventType: EventType;
  conclusionDate: Moment | null;
  conclusionTitle: string | null;
  customerRate: number | null;
  conclusionDescription: string | null;
  cenaDescriptions?:any[] | null;
  attachments: ITimeLineAttachment[] | null;
  changes: IProjectStepChange[] | null;
  comments: ITimeLineComment[] | null;
  projectItem: IProjectItem | null;
  createdBy: string | null;
  createdDate: Moment | null;
  description: string | null;
  isActive: boolean | null;
  isApproved: boolean | null;
  isVisible: boolean | null;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;
  productItems: IProjectItem[] | null;
  projectStep: IProjectStep | null;
  rootEvent: ITimeLineEvent | null;
  rootEventId: number | null;


  constructor(timeLineEvent: any) {
    timeLineEvent = timeLineEvent || {};
    this.conclusionDate = timeLineEvent.conclusionDate ? moment(timeLineEvent.conclusionDate) : null;
    this.conclusionTitle = timeLineEvent.conclusionTitle;
    this.customerRate = timeLineEvent.customerRate;
    this.conclusionDescription = timeLineEvent.conclusionDescription;
    this.attachments = this.timeLineAttachmentsWithClass(timeLineEvent?.attachments);
    this.changes = timeLineEvent.changes;
    this.comments = this.timeLineCommentsWithClass(timeLineEvent?.comments);
    this.createdBy = timeLineEvent.createdBy;
    this.createdDate = timeLineEvent.createdDate ? moment(timeLineEvent.createdDate) : null;
    this.description = timeLineEvent.description;
    this.id = timeLineEvent.id;
    this.isActive = timeLineEvent.isActive;
    this.isApproved = timeLineEvent.isApproved;
    this.isVisible = timeLineEvent.isVisible;
    this.lastModifiedBy = timeLineEvent.lastModifiedBy;
    this.lastModifiedDate = this.lastModifiedDate = timeLineEvent.lastModifiedDate ? moment(timeLineEvent.lastModifiedDate) : null;
    this.productItems = timeLineEvent.productItems;
    this.projectStep = timeLineEvent.projectStep;
    this.title = timeLineEvent.title;
    this.eventType = timeLineEvent.eventType;
    this.projectItem = timeLineEvent?.projectItem ?? null;
    this.rootEvent = timeLineEvent.rootEvent;
    this.rootEventId = timeLineEvent.rootEventId;
  }

  timeLineCommentsWithClass(comments: ITimeLineComment[]): ITimeLineComment[] {
    if (comments && comments?.length > 0) {
      return comments.map(comment => {
        return new TimeLineComment(comment);
      });
    }
    return [];
  }

  timeLineAttachmentsWithClass(attachments: ITimeLineAttachment[]): ITimeLineAttachment[] {
    if (attachments && attachments?.length > 0) {
      return attachments.map(attachment => {
        return new TimeLineAttachment(attachment);
      });
    }
    return [];
  }

}

export function getTimeLineEventIdentifier(timeLineEvent: ITimeLineEvent): number | undefined {
  return timeLineEvent.id;
}
