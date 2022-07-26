import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import {
  TimeLineEventSharedModule
} from "../../../entities/project-shared/time-line-event-shared/time-line-event-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TimeLineEventSharedModule,
    TimelineRoutingModule
  ]
})
export class TimelineModule { }
