import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectReportManagerComponent } from './project-report-manager/project-report-manager.component';
import { ProjectReportItemFreelancerPieChartComponent } from './project-report-item-freelancer-pie-chart/project-report-item-freelancer-pie-chart.component';
import {NgChartsModule} from "ng2-charts";
import {NbLayoutModule} from "@nebular/theme";
import { ProjectReportItemFreelancerPercentagePieChartComponent } from './project-report-item-freelancer-percentage-pie-chart/project-report-item-freelancer-percentage-pie-chart.component';
import {ProjectBasicSharedModule} from '../project-basic-shared.module';
import {PipeModule} from "../../../core/pipes/pipe.module";
import { ProjectFreelancerCostBarChartComponent } from './project-freelancer-cost-bar-chart/project-freelancer-cost-bar-chart.component';
import { ProjectDeadlinePieChartComponent } from './project-deadline-pie-chart/project-deadline-pie-chart.component';



@NgModule({
  declarations: [
    ProjectReportManagerComponent,
    ProjectReportItemFreelancerPieChartComponent,
    ProjectReportItemFreelancerPercentagePieChartComponent,
    ProjectFreelancerCostBarChartComponent,
    ProjectDeadlinePieChartComponent
  ],
    imports: [
        CommonModule,
        NgChartsModule,
        NbLayoutModule,
        ProjectBasicSharedModule,
        PipeModule
    ]
})
export class ProjectReportsSharedModule { }
