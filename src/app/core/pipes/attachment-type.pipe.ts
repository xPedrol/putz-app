import {Pipe, PipeTransform} from '@angular/core';
import {ITimeLineAttachment} from '../../models/time-line-attachment.model';
import {AttachmentType} from '../../constants/attachment-type.constants';


@Pipe({
  name: 'attachmentType'
})
export class AttachmentTypePipe implements PipeTransform {
  constructor() {
  }

  transform(attachment: ITimeLineAttachment | undefined, type: AttachmentType): boolean {
    if(attachment) {
      switch (type) {
        case AttachmentType.AUDIO:
          return attachment.isAudio();
        case AttachmentType.FRAME:
          return attachment.isIframe();
        case AttachmentType.IMAGE:
          return attachment.isImage();
        case AttachmentType.VIDEO:
          return attachment.isVideo();
        case AttachmentType.EXTERNAL_LINK:
          return attachment.isExternalLink();
      }
    }
    return false;
  }

}
