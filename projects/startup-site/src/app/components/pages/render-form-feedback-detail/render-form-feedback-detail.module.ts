import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenderFormFeedbackDetailRoutingModule } from './render-form-feedback-detail-routing.module';
import {RenderFormFeedbackDetailComponent} from './render-form-feedback-detail.component';
import {RenderFormsConfigModule} from '../../render-forms-config/render-forms-config.module';


@NgModule({
  declarations: [
    RenderFormFeedbackDetailComponent
  ],
  imports: [
    CommonModule,
    RenderFormFeedbackDetailRoutingModule,
    RenderFormsConfigModule
  ]
})
export class RenderFormFeedbackDetailModule { }
