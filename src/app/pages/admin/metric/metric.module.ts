import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetricRoutingModule } from './metric-routing.module';
import {MetricSharedModule} from '../../../entities/metric-shared/metric-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MetricSharedModule,
    MetricRoutingModule
  ]
})
export class MetricModule { }
