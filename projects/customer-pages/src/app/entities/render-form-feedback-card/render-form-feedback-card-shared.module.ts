import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormFeedbackCardComponent} from './render-form-feedback-card/render-form-feedback-card.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbProgressBarModule,
  NbSpinnerModule
} from '@nebular/theme';
import {PipeModule} from '../../../../../../src/app/core/pipes/pipe.module';
import {TranslateModule} from '@ngx-translate/core';
import {RenderFormFeedbackDetailComponent} from './render-form-feedback-detail/render-form-feedback-detail.component';
import {ComponentsModule} from '../../../../../../src/app/shared/components/components.module';


@NgModule({
  declarations: [
    RenderFormFeedbackCardComponent,
    RenderFormFeedbackDetailComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    PipeModule,
    TranslateModule,
    NbProgressBarModule,
    NbIconModule,
    NbAlertModule,
    NbButtonModule,
    NbSpinnerModule,
    ComponentsModule
  ],
  exports: [
    RenderFormFeedbackCardComponent,
    RenderFormFeedbackDetailComponent
  ]
})
export class RenderFormFeedbackCardSharedModule {
}
