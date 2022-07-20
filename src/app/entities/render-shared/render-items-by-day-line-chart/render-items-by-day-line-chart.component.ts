import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {NbThemeService} from "@nebular/theme";
import {ChartThemeService} from "../../../services/chart-theme.service";
import {ThemesEnum} from "../../../constants/themes.constants";
import {IProjectRenderItemByDayGraph} from "../../../models/project-render-item-by-day-graph.model";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-render-items-by-day-line-chart',
  templateUrl: './render-items-by-day-line-chart.component.html',
  styleUrls: ['./render-items-by-day-line-chart.component.scss']
})
export class RenderItemsByDayLineChartComponent implements OnInit, OnChanges {


  @Input() projectRenderItemByDayGraph: IProjectRenderItemByDayGraph[];
  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  public barChartOptions: ChartConfiguration['options'] | any = {
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
        display: true,
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
        data: [],
        label: 'Vídeos finalizados'
      },
      {
        data: [],
        label: 'Média'
      },
      {
        data: [],
        label: 'Mínimo'
      },
      {
        data: [],
        label: 'Máximo'
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
      const projectRenderItemByMonthGraph = changes['projectRenderItemByDayGraph'];
      if (projectRenderItemByMonthGraph.previousValue !== projectRenderItemByMonthGraph.currentValue) {
        const currentValue = projectRenderItemByMonthGraph.currentValue as IProjectRenderItemByDayGraph[];
        this.barChartData.labels = [];
        this.barChartData.datasets[0].data = [];
        currentValue.forEach(graphData => {
          this.barChartData.labels.push(`${graphData.day}`);
          this.barChartData.datasets[0].data.push(graphData.finishedVideos);
          this.barChartData.datasets[1].data.push(graphData.average);
          this.barChartData.datasets[2].data.push(graphData.min);
          this.barChartData.datasets[3].data.push(graphData.max);
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
