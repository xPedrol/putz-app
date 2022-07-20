import {IEchartData} from '../../models/echart-data.model';

export function convertToPorjectCountChart(obj: any): IEchartData {
  const chartData: IEchartData = {
    yData: [],
    xData: []
  };
  for (const [key, value] of Object.entries(obj)) {
    chartData.xData.push(key);
    chartData.yData.push(value as string | number);
  }
  return chartData;
}
