import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from 'chart.js';
import {NbThemeService} from '@nebular/theme';
import {ChartThemeService} from '../../../services/chart-theme.service';
import {ThemesEnum} from '../../../constants/themes.constants';
import {IProjectCostAndSaleGraph} from '../../../models/project-budget-item-freelancer-percentage.model';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-project-cost-and-sale-bar-chart',
  templateUrl: './project-cost-and-sale-bar-chart.component.html',
  styleUrls: ['./project-cost-and-sale-bar-chart.component.scss']
})
export class ProjectCostAndSaleBarChartComponent implements OnInit, OnChanges {
  @Input() projectCostAndSales: IProjectCostAndSaleGraph[];
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
      const projectCostAndSales = changes['projectCostAndSales'];
      if (projectCostAndSales.previousValue !== projectCostAndSales.currentValue) {
        const currentValue = projectCostAndSales.currentValue as IProjectCostAndSaleGraph[];
        currentValue.forEach(data => {
          this.barChartData.labels.push(data.project);
          this.barChartData.datasets[0].data.push(Number(Math.round(data.totalCost / data.salePrice * 100).toFixed(2)));
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
