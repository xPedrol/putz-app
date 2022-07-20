import {Component, Input, OnInit} from '@angular/core';
import {IProjectRenderItem} from '../../../../../../../src/app/models/project-render-item.model';
import {IProjectRenderItemStatus} from '../../../../../../../src/app/models/enums/project-render-item-status.model';


@Component({
  selector: 'app-render-form-feedback-card',
  templateUrl: './render-form-feedback-card.component.html',
  styleUrls: ['./render-form-feedback-card.component.scss']
})
export class RenderFormFeedbackCardComponent implements OnInit {
  @Input() renderItem: IProjectRenderItem | undefined;
  @Input() renderId: number | undefined;
  @Input() renderItemId: number | undefined;
  @Input() isPreRegistered: boolean | undefined;
  renderStatus = IProjectRenderItemStatus;
  constructor() {
  }

  ngOnInit(): void {
  }


}
