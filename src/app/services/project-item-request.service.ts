import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {
  getProjectItemRequestIdentifier,
  IProjectItemRequest,
  ProjectItemRequest
} from '../models/project-item-request.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import {environment} from '../../environments/environment';
import {ProjectItemRequestStatus} from '../models/enums/project-item-request-status.model';

export type queryType = { projectItemRequests: IProjectItemRequest[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<IProjectItemRequest>;
export type EntityArrayResponseType = HttpResponse<IProjectItemRequest[]>;

@Injectable({providedIn: 'root'})
export class ProjectItemRequestService {
  projectItemRequests$: BehaviorSubject<queryType | null>;
  projectItemRequest$: BehaviorSubject<IProjectItemRequest | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/projects/itemrequests`;

  constructor(
    protected http: HttpClient,
  ) {
    this.projectItemRequests$ = new BehaviorSubject<queryType | null>(null);
    this.projectItemRequest$ = new BehaviorSubject<IProjectItemRequest | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  create(projectItemRequest: IProjectItemRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectItemRequest);
    return this.http
      .post<IProjectItemRequest>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(projectItemRequest: IProjectItemRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectItemRequest);
    return this.http
      .put<IProjectItemRequest>(`${this.resourceUrl}/${getProjectItemRequestIdentifier(projectItemRequest) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(projectItemRequest: IProjectItemRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectItemRequest);
    return this.http
      .patch<IProjectItemRequest>(`${this.resourceUrl}/${getProjectItemRequestIdentifier(projectItemRequest) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByAdmin(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProjectItemRequest>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<IProjectItemRequest> {
    return this.http
      .get<IProjectItemRequest>(`${environment.API_URL}projects/opportunities/requests/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItemRequest[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByProjectId(projectId: number, req?: any, save: boolean = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItemRequest[]>(`${environment.API_URL}projects/${projectId}/opportunities/requests`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  getByAccount(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItemRequest[]>(`${environment.API_URL}account/opportunities/requests`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  createRequest(projectItemId: number, description: string): Observable<IProjectItemRequest> {
    return this.http
      .post<IProjectItemRequest>(`${environment.API_URL}projects/opportunities/${projectItemId}/requests`, description, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  changeRequestStatus(projectItemRequest: IProjectItemRequest, save = true): Observable<IProjectItemRequest> {
    return this.http
      .put<IProjectItemRequest>(`${environment.API_URL}projects/opportunities/requests/${projectItemRequest?.id}`, projectItemRequest.requestStatus, {
        observe: 'response',
        headers: {'Content-Type': 'application/json'}
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res, save)));
  }

  changeRequestStatusWithAllObj(projectItemRequest: IProjectItemRequest, save = true): Observable<IProjectItemRequest> {
    return this.http
      .put<IProjectItemRequest>(`${environment.API_URL}projects/opportunities/requests/${projectItemRequest?.id}/item`, projectItemRequest, {
        observe: 'response',
        headers: {'Content-Type': 'application/json'}
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res, save)));
  }

  deleteByAdmin(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${environment.API_URL}projects/opportunities/${id}`);
  }

  addProjectItemRequestToCollectionIfMissing(
    projectItemRequestCollection: IProjectItemRequest[],
    ...projectItemRequestsToCheck: (IProjectItemRequest | null | undefined)[]
  ): IProjectItemRequest[] {
    const projectItemRequests: IProjectItemRequest[] = projectItemRequestsToCheck.filter(isPresent);
    if (projectItemRequests.length > 0) {
      const projectItemRequestCollectionIdentifiers = projectItemRequestCollection.map(
        projectItemRequestItem => getProjectItemRequestIdentifier(projectItemRequestItem)!
      );
      const projectItemRequestsToAdd = projectItemRequests.filter(projectItemRequestItem => {
        const projectItemRequestIdentifier = getProjectItemRequestIdentifier(projectItemRequestItem);
        if (projectItemRequestIdentifier == null || projectItemRequestCollectionIdentifiers.includes(projectItemRequestIdentifier)) {
          return false;
        }
        projectItemRequestCollectionIdentifiers.push(projectItemRequestIdentifier);
        return true;
      });
      return [...projectItemRequestsToAdd, ...projectItemRequestCollection];
    }
    return projectItemRequestCollection;
  }

  setProjectItemRequests(req: queryType | null = null): void {
    if (req?.headers) {
      this.totalCount$.next((Number(req.headers.get('X-Total-Count'))));
    }
    this.projectItemRequests$.next(req);
  }

  setProjectItemRequest(project: IProjectItemRequest | null = null): void {
    this.projectItemRequest$.next(project);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save: boolean = true): queryType {
    const projectItemRequests: IProjectItemRequest[] = this.convertProjectItemRequests(res.body);
    const req = {projectItemRequests, headers: res.headers};
    if (save) {
      this.setProjectItemRequests(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType, save = true): IProjectItemRequest {
    const projectItemRequest: IProjectItemRequest = this.convertProjectItemRequest(res.body);
    if (save) {
      this.setProjectItemRequest(projectItemRequest);
    }
    return projectItemRequest;
  }

  convertProjectItemRequests(projectItemRequests: IProjectItemRequest[] | null): IProjectItemRequest[] {
    if (projectItemRequests && projectItemRequests?.length > 0) {
      return projectItemRequests.map(projectItemRequest => {
        return this.convertProjectItemRequest(projectItemRequest);
      });
    }
    return [];
  }

  convertProjectItemRequest(projectItemRequest: IProjectItemRequest | null): IProjectItemRequest {
    // this.setProjectStep(pStepN);
    return new ProjectItemRequest(projectItemRequest);
  }

  clearProjectItemRequest(): void {
    this.projectItemRequest$.next(null);
  }

  clearProjectItemRequests(): void {
    this.projectItemRequests$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(projectItemRequest: IProjectItemRequest): IProjectItemRequest {
    return Object.assign({}, projectItemRequest, {
      createdDate: projectItemRequest.createdDate?.isValid() ? projectItemRequest.createdDate.toJSON() : undefined,
      lastModifiedDate: projectItemRequest.lastModifiedDate?.isValid() ? projectItemRequest.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((projectItemRequest: IProjectItemRequest) => {
        projectItemRequest.createdDate = projectItemRequest.createdDate ? moment(projectItemRequest.createdDate) : undefined;
        projectItemRequest.lastModifiedDate = projectItemRequest.lastModifiedDate ? moment(projectItemRequest.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
