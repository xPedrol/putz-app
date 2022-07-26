import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormDetailFooterComponent} from './render-form-detail-footer/render-form-detail-footer.component';
import {RenderFormDetailHeaderComponent} from './render-form-detail-header/render-form-detail-header.component';
import {RenderFormDetailWrapperComponent} from './render-form-detail-wrapper/render-form-detail-wrapper.component';
import {
  DetailHeaderTitleComponent
} from './render-form-detail-header/detail-header-title/detail-header-title.component';
import {
  DetailHeaderSubtitleComponent
} from './render-form-detail-header/detail-header-subtitle/detail-header-subtitle.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {FormsModule} from "@angular/forms";
import {NoProjectIdDialogComponent} from "./no-project-id-dialog/no-project-id-dialog.component";
import {
  RenderFormFeedbackCardComponent
} from './render-form-feedback-card/render-form-feedback-card/render-form-feedback-card.component';
import {PipeModule} from '../../../../../../src/app/core/pipes/pipe.module';
import {NgbAlertModule, NgbProgressbarModule} from "@ng-bootstrap/ng-bootstrap";
import { RenderFormButtonsComponent } from './render-form-buttons/render-form-buttons.component';


@NgModule({
  declarations: [
    RenderFormDetailFooterComponent,
    RenderFormDetailHeaderComponent,
    RenderFormDetailWrapperComponent,
    DetailHeaderTitleComponent,
    DetailHeaderSubtitleComponent,
    NoProjectIdDialogComponent,
    RenderFormFeedbackCardComponent,
    RenderFormButtonsComponent
  ],
  exports: [
    RenderFormDetailHeaderComponent,
    RenderFormDetailWrapperComponent,
    DetailHeaderTitleComponent,
    DetailHeaderSubtitleComponent,
    NoProjectIdDialogComponent,
    RenderFormFeedbackCardComponent,
    RenderFormButtonsComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    FormsModule,
    PipeModule,
    NgbAlertModule,
    NgbProgressbarModule
  ]
})
export class RenderFormsConfigModule {
}
