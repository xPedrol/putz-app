import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFreelancerComponent } from './dashboard-freelancer/dashboard-freelancer.component';
import {DashboardSharedModule} from "../dashboard-shared/dashboard-shared.module";
import {NbButtonModule, NbIconModule, NbSpinnerModule, NbTooltipModule} from "@nebular/theme";
import {RouterModule} from "@angular/router";
import {PortfolioBasicSharedModule} from "../../portfolio/portfolio-basic-shared.module";
import {ComponentsModule} from "../../../shared/components/components.module";
import {
  OpportunityListBasicSharedModule
} from "../../opportunity-shared/opportunity-list-basic-shared/opportunity-list-basic-shared.module";
import {ProjectBasicSharedModule} from "../../project-shared/project-basic-shared.module";
import {ProjectItemBasicSharedModule} from "../../project-shared/project-item-shared/project-item-basic-shared.module";



@NgModule({
  declarations: [
    DashboardFreelancerComponent
  ],
  imports: [
    CommonModule,
    DashboardSharedModule,
    NbTooltipModule,
    NbIconModule,
    RouterModule,
    NbButtonModule,
    NbSpinnerModule,
    PortfolioBasicSharedModule,
    ComponentsModule,
    OpportunityListBasicSharedModule,
    ProjectBasicSharedModule,
    ProjectItemBasicSharedModule
  ]
})
export class DashboardFreelancerSharedModule { }
