import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import {
  RenderFormFeedbackCardSharedModule
} from '../../entities/render-form-feedback-card/render-form-feedback-card-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderFormFeedbackCardSharedModule,
    FeedbackRoutingModule
  ]
})
export class FeedbackModule { }
