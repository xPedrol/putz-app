import * as moment from 'moment';
import {Moment} from 'moment';
import {ITimeLineEvent} from './time-line-event.model';

export interface ITimeLineAttachment {
  id?: number;
  name?: string;
  extension?: string | null;
  link?: string | null;
  isActive?: boolean | null;
  createdDate?: Moment | null;
  lastModifiedDate?: Moment | null;
  createdBy?: string | null;
  lastModifiedBy?: string | null;
  event?: ITimeLineEvent | null;

  isImage(): boolean;

  isVideo(): boolean;

  isAudio(): boolean;

  isIframe(): boolean;

  isExternalLink(): boolean;

  setExtension(link: string): void;
}

export class TimeLineAttachment implements ITimeLineAttachment {
  createdBy: string | null;
  createdDate: Moment | null;
  event: ITimeLineEvent | null;
  extension: string | null;
  id: number;
  isActive: boolean | null;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;
  link: string | null;
  name: string;

  constructor(attachment: any = null) {
    attachment = attachment ?? {};
    this.createdBy = attachment.createdBy;
    this.createdDate = attachment.createdDate ? moment(attachment.createdDate) : null;
    this.event = attachment.event;
    this.extension = attachment.extension;
    this.id = attachment.id;
    this.isActive = attachment.isActive;
    this.lastModifiedBy = attachment.lastModifiedBy;
    this.lastModifiedDate = attachment.lastModifiedDate ? moment(attachment.lastModifiedDate) : null;
    this.link = attachment.link;
    this.name = attachment.name;
  }

  isAudio(extension = this.extension): boolean {
    const extensions = ['mp3', 'aiff', 'wav', 'ogg'];
    return extensions.includes(extension ?? '');
  }

  isIframe(extension = this.extension): boolean {
    const extensions = ['pdf'];
    return extensions.includes(extension ?? '');
  }

  isImage(extension = this.extension): boolean {
    const extensions = ['jpg', 'png', 'jpeg', 'bmp'];
    return extensions.includes(extension ?? '');
  }

  isVideo(extension = this.extension): boolean {
    const extensions = ['mp4', 'avi', 'mpg', 'mpeg'];
    return extensions.includes(extension ?? '');
  }

  isExternalLink(): boolean {
    if (this.isAudio()) return false;
    if (this.isIframe()) return false;
    if (this.isImage()) return false;
    if (this.isVideo()) return false;

    return true;
  }

  setExtension(link: string): void {
    // http://www.africau.edu/images/default/sample.pdf
    let splitteds = link.split('.');
    for (let splitted of splitteds) {
      if (this.isAudio(splitted) ||
        this.isImage(splitted) ||
        this.isVideo(splitted) ||
        this.isIframe(splitted)
      ) this.extension = splitted;
    }

  }

}

export function getTimeLineAttachmentIdentifier(timeLineAttachment: ITimeLineAttachment): number | undefined {
  return timeLineAttachment.id;
}
