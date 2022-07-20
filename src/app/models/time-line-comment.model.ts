import * as moment from 'moment';
import {Moment} from 'moment';
import {ITimeLineEvent} from './time-line-event.model';
import {IUserBasic, UserBasic} from "./basics/user-basic.model";

export interface ITimeLineComment {
  id?: number;
  description?: string;
  isVisible?: boolean | null;
  isActive?: boolean | null;
  createdDate?: Moment;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  rootComment?: ITimeLineComment | null;
  event?: ITimeLineEvent | null;
  user?: IUserBasic | null;
}

export class TimeLineComment implements ITimeLineComment {
  createdBy: string | null;
  createdDate: Moment;
  description: string;
  event: ITimeLineEvent | null;
  id: number;
  isActive: boolean | null;
  isVisible: boolean | null;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;
  rootComment: ITimeLineComment | null;
  user: IUserBasic | null;

  constructor(comment: any) {
    comment = comment || {};
    this.createdBy = comment.createdBy;
    this.createdDate = comment.createdDate ? moment(comment.createdDate) : moment();
    this.description = comment.description;
    this.event = comment.event;
    this.id = comment.id;
    this.isActive = comment.isActive;
    this.isVisible = comment.isVisible;
    this.lastModifiedBy = comment.lastModifiedBy;
    this.lastModifiedDate = comment.lastModifiedDate ? moment(comment.lastModifiedDate) : null;
    this.rootComment = comment.rootComment;
    this.user = new UserBasic(comment.user);
  }

}

export function getTimeLineCommentIdentifier(timeLineComment: ITimeLineComment): number | undefined {
  return timeLineComment.id;
}
