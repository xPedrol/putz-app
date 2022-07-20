import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {NbThemeService} from "@nebular/theme";
import {ILastProjectDates, lastProjectsDatesEnum} from "../../../models/last-projects-dates.model";
import {ThemesEnum} from "../../../constants/themes.constants";
import {ChartThemeService} from "../../../services/chart-theme.service";

@Component({
  selector: 'app-last-projects-dates-bar-chart',
  templateUrl: './last-projects-dates-bar-chart.component.html',
  styleUrls: ['./last-projects-dates-bar-chart.component.scss']
})
export class LastProjectsDatesBarChartComponent implements OnInit, OnChanges {
  lastProjectTimesChartDisplay = {
    lastThirtyDays: {name: "Últimos 30 dias", value: 0},
    lastSevenDays: {name: "Últimos 7 dias", value: 0},
    lastTwentyFourHours: {name: "Últimass 24 horas", value: 0}
  };
  @Input() lastProjectDates: ILastProjectDates;
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

  public barChartData: ChartData<'bar'> = {
    labels: [
      this.lastProjectTimesChartDisplay[lastProjectsDatesEnum.lastThirtyDays].name,
      this.lastProjectTimesChartDisplay[lastProjectsDatesEnum.lastSevenDays].name,
      this.lastProjectTimesChartDisplay[lastProjectsDatesEnum.lastTwentyFourHours].name
    ],
    datasets: [
      {
        data: [],
        label: 'Quantidade de projetos',
        backgroundColor: '#3366ff',
        hoverBackgroundColor: '#598bff',
        borderColor: '#3366ff',
        hoverBorderColor: '#598bff',
      }
    ]
  };

  constructor(
    private themeService: NbThemeService,
    private chartThemeService: ChartThemeService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const lastProjectDates = changes['lastProjectDates'];
    if (lastProjectDates.previousValue !== lastProjectDates.currentValue) {
      const currentValue = lastProjectDates.currentValue as ILastProjectDates;
      this.barChartData.datasets[0].data = [];
      this.barChartData.datasets[0].data.push(currentValue.lastThirtyDays);
      this.barChartData.datasets[0].data.push(currentValue.lastSevenDays);
      this.barChartData.datasets[0].data.push(currentValue.lastTwentyFourHours);
      this.chart?.update();
    }
  }

  ngOnInit(): void {
    this.themeService.onThemeChange().subscribe((theme) => {
      if (theme.name === ThemesEnum.DARK) {
        this.chartThemeService.selectedTheme = `dark-theme`;
      } else {
        this.chartThemeService.selectedTheme = `light-theme`;
      }
      // this.chart?.update();
    });
  }

  // events
  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }
}
