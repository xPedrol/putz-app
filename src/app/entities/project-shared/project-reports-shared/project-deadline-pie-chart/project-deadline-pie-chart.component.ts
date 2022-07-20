import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild} from '@angular/core';
import {
  IProjectBudgetItemFreelancerPercentage, IProjectDeadlineGraph
} from "../../../../models/project-budget-item-freelancer-percentage.model";
import {BaseChartDirective} from "ng2-charts";
import {isPlatformBrowser} from "@angular/common";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";

@Component({
  selector: 'app-project-deadline-pie-chart',
  templateUrl: './project-deadline-pie-chart.component.html',
  styleUrls: ['./project-deadline-pie-chart.component.scss']
})
export class ProjectDeadlinePieChartComponent implements OnInit, OnChanges {
  @Input() projectDeadLine: IProjectDeadlineGraph[];
  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective | undefined;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isBrowser) {
      const projectBudgetItemFreelancer = changes['projectDeadLine'];
      if (projectBudgetItemFreelancer.previousValue !== projectBudgetItemFreelancer.currentValue) {
        const currentValue = projectBudgetItemFreelancer.currentValue as IProjectDeadlineGraph[];
        this.pieChartData.datasets[0].data = [];
        currentValue.forEach(item => {
          if(item.status === "Atrasado") {
            this.pieChartData.labels.push(`${item.status} em ${item.totalDays} dia(s)`);
          }else{
            this.pieChartData.labels.push(item.status);
          }
          this.pieChartData.datasets[0].data.push(item.percentage);
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
