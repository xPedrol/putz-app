import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectResumeCardComponent} from './lists/project-resume-card/project-resume-card.component';
import {PipeModule} from '../../core/pipes/pipe.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule, NbFormFieldModule,
  NbIconModule, NbInputModule,
  NbListModule,
  NbTagModule,
  NbTooltipModule
} from '@nebular/theme';
import {ComponentsModule} from '../../shared/components/components.module';
import {NbSecurityModule} from '@nebular/security';
import {
  LastProjectsDatesBarChartComponent
} from "./last-projects-dates-bar-chart/last-projects-dates-bar-chart.component";
import {NgChartsModule} from "ng2-charts";
import { ProjectCostAndSaleBarChartComponent } from './project-cost-and-sale-bar-chart/project-cost-and-sale-bar-chart.component';
import { ProjectConceptionCancelDialogComponent } from './project-conception-cancel-dialog/project-conception-cancel-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProjectResumeCardComponent,
    LastProjectsDatesBarChartComponent,
    ProjectCostAndSaleBarChartComponent,
    ProjectConceptionCancelDialogComponent
  ],
  imports: [
    PipeModule,
    CommonModule,
    TranslateModule,
    NbCardModule,
    NbTagModule,
    NbIconModule,
    NbListModule,
    NbButtonModule,
    RouterModule,
    NbBadgeModule,
    ComponentsModule,
    NbTooltipModule,
    NbSecurityModule,
    NgChartsModule,
    NbFormFieldModule,
    ReactiveFormsModule,
    NbInputModule
  ],
  exports: [
    ProjectResumeCardComponent,
    LastProjectsDatesBarChartComponent,
    ProjectCostAndSaleBarChartComponent
  ]
})
export class ProjectBasicSharedModule {
}
