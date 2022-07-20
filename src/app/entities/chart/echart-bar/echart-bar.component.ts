import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'app-echart-bar',
  templateUrl: './echart-bar.component.html',
  styleUrls: ['./echart-bar.component.scss']
})
export class EchartBarComponent implements AfterViewInit, OnDestroy {
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
          type: 'shadow',
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
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
          }
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Total de Projetos',
          type: 'bar',
          barWidth: '60%',
        },
      ],
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
            data: this.xData
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
            data: this.yData
          }
        ]
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
