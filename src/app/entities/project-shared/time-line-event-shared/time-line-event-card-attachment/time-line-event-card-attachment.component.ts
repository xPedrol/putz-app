import {Component, Input, OnInit} from '@angular/core';
import {ITimeLineAttachment} from '../../../../models/time-line-attachment.model';
import {AttachmentType} from '../../../../constants/attachment-type.constants';

@Component({
  selector: 'app-time-line-event-card-attachment',
  templateUrl: './time-line-event-card-attachment.component.html',
  styleUrls: ['./time-line-event-card-attachment.component.scss','../../../../shared/themes/common.scss']
})
export class TimeLineEventCardAttachmentComponent implements OnInit {
  @Input() attachment: ITimeLineAttachment | undefined;
  type = AttachmentType;
  constructor() {
  }

  ngOnInit(): void {
  }

}
