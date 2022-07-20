import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ILastProjectDates} from "../models/last-projects-dates.model";
import {environment} from "../../environments/environment";
import {IProjectRenderItemByMonthGraph} from "../models/projectItemByMonthGraph.model";
import {IProjectRenderItemByDayGraph} from "../models/project-render-item-by-day-graph.model";
import {IProjectRenderItemByHourGraph} from "../models/project-render-item-by-hour-graph.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectRenderItemGraphService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getProjectItemByMonthGraph(projectRenderSlug: string, req?: any): Observable<IProjectRenderItemByMonthGraph[]> {
    const url = `render/${projectRenderSlug}/items/graph/by-month`;
    return this.http.get<IProjectRenderItemByMonthGraph[]>(`${environment.API_URL}${url}`, {
      params: req
    });
  }

  getProjectItemByDayGraph(projectRenderSlug: string, req?: any): Observable<IProjectRenderItemByDayGraph[]> {
    const url = `render/${projectRenderSlug}/graph/render-statistics/by-day`;
    return this.http.get<IProjectRenderItemByDayGraph[]>(`${environment.API_URL}${url}`, {
      params: req
    });
  }

  getProjectItemByHourGraph(projectRenderSlug: string, req?: any): Observable<IProjectRenderItemByHourGraph[]> {
    const url = `render/${projectRenderSlug}/graph/render-statistics/by-hour`;
    return this.http.get<IProjectRenderItemByHourGraph[]>(`${environment.API_URL}${url}`, {
      params: req
    });
  }
}
