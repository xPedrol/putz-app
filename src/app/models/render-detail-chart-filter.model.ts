import {Moment} from "moment";

export interface IRenderDetailChartFilter {
  startDate: string | Moment;
  endDate: string | Moment;
  status: string;
}
