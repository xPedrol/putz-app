import {IProjectRenderItemByDayGraph} from "./project-render-item-by-day-graph.model";

export interface IProjectRenderItemByHourGraph extends IProjectRenderItemByDayGraph {
  hour: number;
}
