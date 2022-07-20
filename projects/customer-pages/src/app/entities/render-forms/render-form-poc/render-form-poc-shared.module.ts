import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormPocComponent} from './render-form-poc.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule,
  NbTooltipModule
} from '@nebular/theme';
import {NgxMaskModule} from 'ngx-mask';
import {RenderFormWrapperModule} from '../../render-form-wrapper/render-form-wrapper.module';
import {RenderFormPocDetailComponent} from './render-form-poc-detail/render-form-poc-detail.component';
import {
  RenderFormFeedbackCardSharedModule
} from '../../render-form-feedback-card/render-form-feedback-card-shared.module';
import {
  RenderFormDetailComponentsModule
} from "../../render-form-detail-components/render-form-detail-components.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [RenderFormPocComponent, RenderFormPocDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbFormFieldModule,
    NbOptionModule,
    NbSelectModule,
    NbAutocompleteModule,
    NbInputModule,
    NbIconModule,
    NgxMaskModule,
    RenderFormWrapperModule,
    RenderFormFeedbackCardSharedModule,
    NbTooltipModule,
    NbButtonModule,
    RenderFormDetailComponentsModule,
    RouterModule
  ],
  exports: [
    RenderFormPocComponent
  ]
})
export class RenderFormPocSharedModule {
}
