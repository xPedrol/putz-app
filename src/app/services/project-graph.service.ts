import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILastProjectDates} from '../models/last-projects-dates.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IProjectBudgetItemFreelancer} from '../models/project-budget-item-freelancer.model';
import {
  IProjectBudgetItemFreelancerPercentage, IProjectBudgetItemFreelancerPercentageGroupDate,
  IProjectCostAndSaleGraph, IProjectDeadlineGraph
} from '../models/project-budget-item-freelancer-percentage.model';
import {createRequestOption} from '../core/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class ProjectGraphService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getLastProjectDates(): Observable<ILastProjectDates> {
    const url = `projects/graph/last-projects`;
    return this.http.get<ILastProjectDates>(`${environment.API_URL}${url}`);
  }

  getProjectBudgetItemFreelancer(req?: any): Observable<IProjectBudgetItemFreelancer[]> {
    const options = createRequestOption(req);
    const url = `projects/graph/percentage-type`;
    return this.http.get<IProjectBudgetItemFreelancer[]>(`${environment.API_URL}${url}`, {
      params: options
    });
  }

  getProjectBudgetItemPercentageFreelancer(req?: any): Observable<IProjectBudgetItemFreelancerPercentage> {
    const options = createRequestOption(req);
    const url = `projects/graph/percentage-freela`;
    return this.http.get<IProjectBudgetItemFreelancerPercentage>(`${environment.API_URL}${url}`, {
      params: options
    });
  }

  getProjectBudgetItemPercentageFreelancerGroupDate(req?: any): Observable<IProjectBudgetItemFreelancerPercentageGroupDate[]> {
    const options = createRequestOption(req);
    const url = `projects/graph/percentage-freela-group-date`;
    return this.http.get<IProjectBudgetItemFreelancerPercentageGroupDate[]>(`${environment.API_URL}${url}`, {
      params: options
    });
  }

  getProjectCostAndSaleGraph(req?: any): Observable<IProjectCostAndSaleGraph[]> {
    const options = createRequestOption(req);
    const url = `projects/graph/finantial-information`;
    return this.http.get<IProjectCostAndSaleGraph[]>(`${environment.API_URL}${url}`, {
      params: options
    });
  }

  getProjectDeadlineGraph(req?: any): Observable<IProjectDeadlineGraph[]> {
    const options = createRequestOption(req);
    const url = `projects/graph/percentage-deadlines`;
    return this.http.get<IProjectDeadlineGraph[]>(`${environment.API_URL}${url}`, {
      params: options
    });
  }
}
