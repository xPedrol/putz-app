import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  RenderFormFeedbackDetailComponent
} from '../../pages/render-form-feedback-detail/render-form-feedback-detail.component';
import {ActivatedRoute} from '@angular/router';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';

@Component({
  selector: 'app-render-form-detail-wrapper',
  templateUrl: './render-form-detail-wrapper.component.html',
  styleUrls: ['./render-form-detail-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderFormDetailWrapperComponent extends RenderFormFeedbackDetailComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public renderItemService: ProjectRenderItemService,
    public cd: ChangeDetectorRef
  ) {
    super(activatedRoute, renderItemService,cd);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
