import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'app-project-line-chart',
  templateUrl: './project-line-chart.component.html',
  styleUrls: ['./project-line-chart.component.scss']
})
export class ProjectLineChartComponent implements AfterViewInit, OnDestroy {
  @Input() xData: (string | number)[] | undefined;
  @Input() yData: (string | number)[] | undefined;
  options: any = {};
  themeSubscription: any;
  cpuLoadChartOptions: any = {};

  constructor(private theme: NbThemeService) {

    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {
            readOnly: false,
          },
          magicType: {
            type: ['line', 'bar'],
          },
          saveAsImage: {
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Projetos Ativos',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
        {
          name: 'Projetos Concluidos',
          data: [720, 832, 701, 134, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ]
    };
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      // @ts-ignore
      const echarts: any = config.variables.echarts;
      this.cpuLoadChartOptions = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        legend: {
          textStyle: {
            color: echarts.textColor,
          }
        },
        xAxis: [
          {
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              label: {
                color: echarts.textColor,
              },
            },
            // data: this.xData
          }
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              label: {
                color: echarts.textColor,
              },
            }
          }
        ],
        series: [
          {
            // data: this.yData
          }
        ]
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
