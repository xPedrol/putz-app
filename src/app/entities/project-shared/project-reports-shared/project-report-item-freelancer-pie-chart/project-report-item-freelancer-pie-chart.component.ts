import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {IProjectBudgetItemFreelancer} from "../../../../models/project-budget-item-freelancer.model";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-project-report-item-freelancer-pie-chart',
  templateUrl: './project-report-item-freelancer-pie-chart.component.html',
  styleUrls: ['./project-report-item-freelancer-pie-chart.component.scss']
})
export class ProjectReportItemFreelancerPieChartComponent implements OnInit, OnChanges {
  @Input() projectBudgetItemFreelancer: IProjectBudgetItemFreelancer[];
  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective | undefined;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isBrowser) {
      const projectBudgetItemFreelancer = changes['projectBudgetItemFreelancer'];
      if (projectBudgetItemFreelancer.previousValue !== projectBudgetItemFreelancer.currentValue) {
        const currentValue = projectBudgetItemFreelancer.currentValue as IProjectBudgetItemFreelancer[];
        this.pieChartData.labels = [];
        this.pieChartData.datasets[0].data = [];
        currentValue.forEach(graphData => {
          this.pieChartData.labels.push(`${graphData.category}`);
          this.pieChartData.datasets[0].data.push(graphData.percentage);
        });
        this.chart?.update();
      }
    }
  }

  ngOnInit() {
  }

  // Pie

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      // @ts-ignore
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [];

  // events
  public chartClicked({event, active}: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
