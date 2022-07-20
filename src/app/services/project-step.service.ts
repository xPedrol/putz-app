import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getProjectStepIdentifier, IProjectStep, ProjectStep} from '../models/project-step.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

export type queryType = { projectSteps: IProjectStep[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<IProjectStep>;
export type EntityArrayResponseType = HttpResponse<IProjectStep[]>;

@Injectable({providedIn: 'root'})
export class ProjectStepService {
  projectSteps: IProjectStep[] | null | undefined;
  projectSteps$: BehaviorSubject<queryType | null>;

  projectStep: IProjectStep | null | undefined;
  projectStep$: BehaviorSubject<IProjectStep | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/projects/steps`;

  constructor(protected http: HttpClient) {
    this.projectSteps = null;
    this.projectSteps$ = new BehaviorSubject<queryType | null>(null);

    this.projectStep = null;
    this.projectStep$ = new BehaviorSubject<IProjectStep | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  createByAdmin(projectStep: IProjectStep): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectStep);
    return this.http
      .post<IProjectStep>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(projectStep: IProjectStep, {projectId, stepId}: any): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectStep);
    return this.http
      .put<IProjectStep>(`${environment.API_URL}projects/${projectId}/steps/${stepId}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  approve({projectId, stepId}: any): Observable<IProjectStep> {
    return this.http
      .put<IProjectStep>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/approve`, null, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  updateByAdmin(projectStep: IProjectStep): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectStep);
    return this.http
      .put<IProjectStep>(`${this.resourceUrl}/${getProjectStepIdentifier(projectStep) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(projectStep: IProjectStep): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectStep);
    return this.http
      .patch<IProjectStep>(`${this.resourceUrl}/${getProjectStepIdentifier(projectStep) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<IProjectStep> {
    return this.http
      .get<IProjectStep>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  queryByProjectID(projectId: number, req?: any)
    : Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectStep[]>(`${environment.API_URL}projects/${projectId}/steps`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectStep[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }


  queryByScheduleName({projectId, scheduleName}: any, req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectStep[]>(`${environment.API_URL}projects/${projectId}/steps/${scheduleName}`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  addProjectStepToCollectionIfMissing(
    projectStepCollection: IProjectStep[],
    ...projectStepsToCheck: (IProjectStep | null | undefined)[]
  ): IProjectStep[] {
    const projectSteps: IProjectStep[] = projectStepsToCheck.filter(isPresent);
    if (projectSteps.length > 0) {
      const projectStepCollectionIdentifiers = projectStepCollection.map(projectStepItem => getProjectStepIdentifier(projectStepItem)!);
      const projectStepsToAdd = projectSteps.filter(projectStepItem => {
        const projectStepIdentifier = getProjectStepIdentifier(projectStepItem);
        if (projectStepIdentifier == null || projectStepCollectionIdentifiers.includes(projectStepIdentifier)) {
          return false;
        }
        projectStepCollectionIdentifiers.push(projectStepIdentifier);
        return true;
      });
      return [...projectStepsToAdd, ...projectStepCollection];
    }
    return projectStepCollection;
  }

  setProjectSteps(req: queryType | null = null): void {
    this.projectSteps = req!.projectSteps;
    if (req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.projectSteps$.next(req);
  }

  setProjectStep(projectStep: IProjectStep | null = null): void {
    this.projectStep = projectStep;
    this.projectStep$.next(this.projectStep);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save = true): queryType {
    const projectSteps: IProjectStep[] = this.convertProjectSteps(res.body);
    const req = {projectSteps, headers: res.headers};
    if (save) {
      this.setProjectSteps(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): IProjectStep {
    const projectStep: IProjectStep = this.convertProjectStep(res.body);
    this.setProjectStep(projectStep);
    return projectStep;
  }

  convertProjectSteps(pSteps: IProjectStep[] | null): IProjectStep[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(projectStep => {
        return this.convertProjectStep(projectStep);
      });
    }
    return [];
  }

  convertProjectStep(pStep: IProjectStep | null): IProjectStep {
    const pStepN = new ProjectStep(pStep);
    // this.setProjectStep(pStepN);
    return pStepN;
  }

  clearProjectStep(): void {
    this.projectStep = null;
    this.projectStep$.next(null);
  }

  clearProjectSteps(): void {
    this.projectSteps = null;
    this.projectSteps$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(projectStep: IProjectStep): IProjectStep {
    return Object.assign({}, projectStep, {
      startDate: projectStep.startDate?.isValid() ? projectStep.startDate.toJSON() : undefined,
      endDate: projectStep.endDate?.isValid() ? projectStep.endDate.toJSON() : undefined,
      forecastEndDate: projectStep.forecastEndDate?.isValid() ? projectStep.forecastEndDate.toJSON() : undefined,
      forecastFreelaEndDate: projectStep.forecastFreelaEndDate?.isValid() ? projectStep.forecastFreelaEndDate.toJSON() : undefined,
      startDateExpected: projectStep.startDateExpected?.isValid() ? projectStep.startDateExpected.toJSON() : undefined,
      endDateExpected: projectStep.endDateExpected?.isValid() ? projectStep.endDateExpected.toJSON() : undefined,
      createdDate: projectStep.createdDate?.isValid() ? projectStep.createdDate.toJSON() : undefined,
      lastModifiedDate: projectStep.lastModifiedDate?.isValid() ? projectStep.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
      res.body.forecastEndDate = res.body.forecastEndDate ? moment(res.body.forecastEndDate) : undefined;
      res.body.forecastFreelaEndDate = res.body.forecastFreelaEndDate ? moment(res.body.forecastFreelaEndDate) : undefined;
      res.body.startDateExpected = res.body.startDateExpected ? moment(res.body.startDateExpected) : undefined;
      res.body.endDateExpected = res.body.endDateExpected ? moment(res.body.endDateExpected) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((projectStep: IProjectStep) => {
        projectStep.startDate = projectStep.startDate ? moment(projectStep.startDate) : undefined;
        projectStep.endDate = projectStep.endDate ? moment(projectStep.endDate) : undefined;
        projectStep.forecastEndDate = projectStep.forecastEndDate ? moment(projectStep.forecastEndDate) : undefined;
        projectStep.forecastFreelaEndDate = projectStep.forecastFreelaEndDate ? moment(projectStep.forecastFreelaEndDate) : undefined;
        projectStep.startDateExpected = projectStep.startDateExpected ? moment(projectStep.startDateExpected) : undefined;
        projectStep.endDateExpected = projectStep.endDateExpected ? moment(projectStep.endDateExpected) : undefined;
        projectStep.createdDate = projectStep.createdDate ? moment(projectStep.createdDate) : undefined;
        projectStep.lastModifiedDate = projectStep.lastModifiedDate ? moment(projectStep.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
