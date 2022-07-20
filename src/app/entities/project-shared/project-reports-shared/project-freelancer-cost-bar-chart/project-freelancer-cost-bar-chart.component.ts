import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild} from '@angular/core';
import {
  IProjectBudgetItemFreelancerPercentageGroupDate,
  IProjectCostAndSaleGraph
} from "../../../../models/project-budget-item-freelancer-percentage.model";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {NbThemeService} from "@nebular/theme";
import {ChartThemeService} from "../../../../services/chart-theme.service";
import {isPlatformBrowser} from "@angular/common";
import {ThemesEnum} from "../../../../constants/themes.constants";

@Component({
  selector: 'app-project-freelancer-cost-bar-chart',
  templateUrl: './project-freelancer-cost-bar-chart.component.html',
  styleUrls: ['./project-freelancer-cost-bar-chart.component.scss']
})
export class ProjectFreelancerCostBarChartComponent implements OnInit, OnChanges {
  @Input() freelancerCost: IProjectBudgetItemFreelancerPercentageGroupDate[];
  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          tickWidth: 10
        }
      },
      y: {
        min: 0,
      }
    },
    plugins: {
      legend: {
        display: true
      },
      // @ts-ignore
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];
  isBrowser: boolean;
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Custo / Venda',
        backgroundColor: '#3366ff',
        hoverBackgroundColor: '#274bdb',
        data: []
      }
    ]
  };

  constructor(
    private themeService: NbThemeService,
    private chartThemeService: ChartThemeService,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isBrowser) {
      const freelancerCost = changes['freelancerCost'];
      if (freelancerCost.previousValue !== freelancerCost.currentValue) {
        const currentValue = freelancerCost.currentValue as IProjectBudgetItemFreelancerPercentageGroupDate[];
        currentValue.forEach(data => {
          this.barChartData.labels.push(data.month + '/' + data.year);
          this.barChartData.datasets[0].data.push(Number(Math.round(data.totalFreela / data.totalPrice * 100).toFixed(2)));
        });
        this.chart?.update();
      }
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.themeService.onThemeChange().subscribe((theme) => {
        if (theme.name === ThemesEnum.DARK) {
          this.chartThemeService.selectedTheme = `dark-theme`;
        } else {
          this.chartThemeService.selectedTheme = `light-theme`;
        }
        // this.chart?.update();
      });
    }
  }

  // events
  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }
}
