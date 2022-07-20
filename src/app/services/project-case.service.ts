import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';
import {getProjectCaseIdentifier, IProjectCase, ProjectCase} from '../models/project-case.model';
export type EntityResponseType = HttpResponse<IProjectCase>;
export type EntityArrayResponseType = HttpResponse<IProjectCase[]>;
@Injectable({
  providedIn: 'root'
})
export class ProjectCaseService {
  projectCases$: BehaviorSubject<EntityArrayResponseType | null>;

  projectCase$: BehaviorSubject<IProjectCase | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/projectCases`;

  constructor(
    protected http: HttpClient,
  ) {
    this.projectCases$ = new BehaviorSubject<EntityArrayResponseType | null>(null);

    this.projectCase$ = new BehaviorSubject<IProjectCase | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  create(projectCase: IProjectCase): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectCase);
    return this.http
      .post<IProjectCase>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(projectCase: IProjectCase): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectCase);
    return this.http
      .put<IProjectCase>(`${this.resourceUrl}/${getProjectCaseIdentifier(projectCase) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(projectCase: IProjectCase): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectCase);
    return this.http
      .patch<IProjectCase>(`${this.resourceUrl}/${getProjectCaseIdentifier(projectCase) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProjectCase>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  queryByAdmin(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectCase[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertToProject(res)));
  }

  query(req?: any): Observable<IProjectCase[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectCase[]>(`${environment.API_URL}projectCases`, {params: options});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  addProjectCaseToCollectionIfMissing(projectCaseCollection: IProjectCase[], ...projectCasesToCheck: (IProjectCase | null | undefined)[]): IProjectCase[] {
    const projectCases: IProjectCase[] = projectCasesToCheck.filter(isPresent);
    if (projectCases.length > 0) {
      const projectCaseCollectionIdentifiers = projectCaseCollection.map(projectCaseItem => getProjectCaseIdentifier(projectCaseItem)!);
      const projectCasesToAdd = projectCases.filter(projectCaseItem => {
        const projectCaseIdentifier = getProjectCaseIdentifier(projectCaseItem);
        if (projectCaseIdentifier == null || projectCaseCollectionIdentifiers.includes(projectCaseIdentifier)) {
          return false;
        }
        projectCaseCollectionIdentifiers.push(projectCaseIdentifier);
        return true;
      });
      return [...projectCasesToAdd, ...projectCaseCollection];
    }
    return projectCaseCollection;
  }

  protected convertDateFromClient(projectCase: IProjectCase): IProjectCase {
    return Object.assign({}, projectCase, {
      createdDate: projectCase.createdDate?.isValid() ? projectCase.createdDate.toJSON() : undefined,
      lastModifiedDate: projectCase.lastModifiedDate?.isValid() ? projectCase.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertToProject(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((projectCase: IProjectCase) => {
        projectCase = new ProjectCase(projectCase);
      });
    }
    this.projectCases$.next(res);
    this.totalCount$.next(Number(res.headers.get('X-Total-Count')));
    return res;
  }

  clearProjectCase(): void {
    this.projectCase$.next(null);
  }

  clearProjectCases(): void {
    this.projectCases$.next(null);
    this.totalCount$.next(0);
  }
}
