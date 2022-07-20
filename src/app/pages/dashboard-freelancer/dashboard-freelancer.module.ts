import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFreelancerRoutingModule } from './dashboard-freelancer-routing.module';
import {
  DashboardFreelancerSharedModule
} from "../../entities/dashboards/dashboard-freelancer-shared/dashboard-freelancer-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardFreelancerSharedModule,
    DashboardFreelancerRoutingModule
  ]
})
export class DashboardFreelancerModule { }
