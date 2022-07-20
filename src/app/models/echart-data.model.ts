export interface IEchartData {
  xData: (string | number)[];
  yData: (string | number)[];
}

export class EchartData implements IEchartData {
  xData: (string | number)[];
  yData: (string | number)[];

  constructor(xData: (string | number)[], yData: (string | number)[]) {
    this.xData = xData;
    this.yData = yData;
  }


}
