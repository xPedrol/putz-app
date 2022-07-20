import {Moment} from "moment";

export interface IProjectDeadline {
  detail: string;
  expected: Moment;
  percentage: number;
  salePrice: number;
  start: Moment;
  step: string;
  totalCost: number;
}
