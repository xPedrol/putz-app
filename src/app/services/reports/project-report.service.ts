import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {createRequestOption} from "../../core/utils/request-util";
import {environment} from "../../../environments/environment";
import {IProjectBudgetItemData} from "../../models/reports/project-budget-item.model";
import {IApprovedProject} from '../../models/reports/project-deadline-detail.model';
import {IProjectDeadline} from "../../models/project-deadline.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectReportService {

  constructor(
    private http: HttpClient
  ) {
  }

  queryProjectBudgetItemData(req?: any): Observable<IProjectBudgetItemData[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectBudgetItemData[]>(`${environment.API_URL}projects/info/total-type`, {
        params: options
      });
  }

  queryApprovedProjects(req?: any): Observable<IApprovedProject[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IApprovedProject[]>(`${environment.API_URL}projects/info/financial-report`, {
        params: options
      });
  }

  queryProjectDeadlines(req?: any): Observable<IProjectDeadline[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectDeadline[]>(`${environment.API_URL}projects/info/detail-project`, {
        params: options
      });
  }


}
