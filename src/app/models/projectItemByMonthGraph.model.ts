import {IProjectRenderItemStatus} from "./enums/project-render-item-status.model";

export interface IProjectRenderItemByMonthGraph {
  status: IProjectRenderItemStatus;
  mouth: number;
  year: number;
  total: number;
}
