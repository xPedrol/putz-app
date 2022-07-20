import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartBarComponent } from './echart-bar/echart-bar.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { ProjectLineChartComponent } from './project-line-chart/project-line-chart.component';



@NgModule({
  declarations: [
    EchartBarComponent,
    ProjectLineChartComponent
  ],
  exports: [
    EchartBarComponent,
    ProjectLineChartComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ]
})
export class ChartModule { }
