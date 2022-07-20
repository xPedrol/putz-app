import * as moment from 'moment';
import {Moment} from 'moment';
import {IRenderBotStatus, statusList} from './render-bot-status.model';

export interface IRenderBot {
  createdDate?: Moment | null;
  description?: string | null,
  lastModifiedDate?: Moment | null;
  name?: string | null,
  slug?: string | null
  isActive?: boolean;
  status: IRenderBotStatus;

}

export class RenderBot implements IRenderBot {
  createdDate?: Moment | null;
  description?: string | null;
  lastModifiedDate?: Moment | null;
  name?: string | null;
  slug?: string | null;
  status: IRenderBotStatus;

  constructor(renderBot: any = null) {
    renderBot = renderBot ?? {};
    this.createdDate = renderBot.createdDate ? moment(renderBot.createdDate) : null;
    this.description = renderBot.description;
    this.lastModifiedDate = renderBot.lastModifiedDate ? moment(renderBot.lastModifiedDate) : null;
    this.name = renderBot.name;
    this.slug = renderBot.slug;
    this.status = this.getStatus();
  }

  getStatus(): IRenderBotStatus {
    const minutes = Math.abs(moment().diff(this.lastModifiedDate, 'minutes'));
    if (minutes <= 5) {
      return statusList[0];
    }
    if (minutes <= 10) {
      return statusList[1];
    }
    return statusList[2];
  }

}
