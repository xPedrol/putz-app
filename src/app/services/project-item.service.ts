import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getProjectItemIdentifier, IProjectItem, ProjectItem} from '../models/project-item.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

export type EntityResponseType = HttpResponse<IProjectItem>;
export type EntityArrayResponseType = HttpResponse<IProjectItem[]>;
export type queryType = { projectItems: IProjectItem[], headers?: HttpHeaders };

@Injectable({providedIn: 'root'})
export class ProjectItemService {
  projectItems: IProjectItem[] | null | undefined;
  projectItems$: BehaviorSubject<queryType | null>;
  totalCount$: BehaviorSubject<number>;

  projectItem: IProjectItem | null | undefined;
  projectItem$: BehaviorSubject<IProjectItem | null>;
  isOpportunity = false;
  protected resourceUrl = `${environment.API_URL}admin/project/items`;

  constructor(
    protected http: HttpClient,
  ) {
    this.projectItems = null;
    this.projectItems$ = new BehaviorSubject<queryType | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);

    this.projectItem = null;
    this.projectItem$ = new BehaviorSubject<IProjectItem | null>(null);
  }

  createByAdmin(projectItem: IProjectItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectItem);
    return this.http
      .post<IProjectItem>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  create(projectItem: IProjectItem, projectId: number): Observable<IProjectItem> {
    const copy = this.convertDateFromClient(projectItem);
    return this.http
      .post<IProjectItem>(`${environment.API_URL}projects/${projectId}/items`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  createListItemByProjectId(projectId: number, projectItems: IProjectItem[]): Observable<IProjectItem[]> {

    projectItems.map(value => {
      value.project = undefined;
      value.projectStep = undefined;
    });

    const copy = this.convertDateArrayFromClient(projectItems);
    return this.http
      .post<IProjectItem[]>(`${environment.API_URL}projects/${projectId}/items/list`, copy)
      .pipe(map((res: IProjectItem[]) => this.convertProjectItems(res)));
  }


  updateByAdmin(projectItem: IProjectItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectItem);
    return this.http
      .put<IProjectItem>(`${this.resourceUrl}/${getProjectItemIdentifier(projectItem) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(projectItem: IProjectItem, projectId: number): Observable<IProjectItem> {
    const copy = this.convertDateFromClient(projectItem);
    return this.http
      .put<IProjectItem>(`${environment.API_URL}projects/${projectId}/items/${projectItem?.id}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  partialUpdate(projectItem: IProjectItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectItem);
    return this.http
      .patch<IProjectItem>(`${this.resourceUrl}/${getProjectItemIdentifier(projectItem) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findOpportunity(id: number): Observable<IProjectItem> {
    return this.http
      .get<IProjectItem>(`${environment.API_URL}projects/opportunities/${id}`)
      .pipe(map((res: IProjectItem) => this.convertProjectItem(res)));
  }

  findByProjectIdAndItemId({projectId, itemId}: any): Observable<IProjectItem> {
    return this.http
      .get<IProjectItem>(`${environment.API_URL}projects/${projectId}/items/${itemId}`)
      .pipe(map((res: IProjectItem) => this.convertProjectItem(res)));
  }

  queryByFreelancer(freelancerId: number, req?: any, isFinished = false): Observable<EntityArrayResponseType> {
    req = req || {};
    req['freelaId'] = freelancerId;
    req['isFinalized'] = isFinished;
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItem[]>(`${environment.API_URL}projects/items/by-freela`, {
        params: options,
        observe: 'response'
      });
  }


  queryByProjectId(projectId: number, req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItem[]>(`${environment.API_URL}projects/${projectId}/items`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  queryByProjectIdAndStepId(projectId: number, stepId: number, req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItem[]>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/items`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  queryByAdmin(req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItem[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  query(req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItem[]>(`${environment.API_URL}projects/items`, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  getOpportunitiesOpened(req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectItem[]>(`${environment.API_URL}projects/opportunities`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  deleteByAdmin(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  delete({projectId, itemId}: any): Observable<HttpResponse<{}>> {
    return this.http.delete(`${environment.API_URL}projects/${projectId}/items/${itemId}`, {observe: 'response'});
  }

  addProjectItemToCollectionIfMissing(
    projectItemCollection: IProjectItem[],
    ...projectItemsToCheck: (IProjectItem | null | undefined)[]
  ): IProjectItem[] {
    const projectItems: IProjectItem[] = projectItemsToCheck.filter(isPresent);
    if (projectItems.length > 0) {
      const projectItemCollectionIdentifiers = projectItemCollection.map(projectItemItem => getProjectItemIdentifier(projectItemItem)!);
      const projectItemsToAdd = projectItems.filter(projectItemItem => {
        const projectItemIdentifier = getProjectItemIdentifier(projectItemItem);
        if (projectItemIdentifier == null || projectItemCollectionIdentifiers.includes(projectItemIdentifier)) {
          return false;
        }
        projectItemCollectionIdentifiers.push(projectItemIdentifier);
        return true;
      });
      return [...projectItemsToAdd, ...projectItemCollection];
    }
    return projectItemCollection;
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save: boolean): queryType {
    const projectItems: IProjectItem[] = this.convertProjectItems(res.body);
    this.totalCount$.next(Number(res.headers.get('X-Total-Count')));
    const req = {projectItems, headers: res.headers};
    if (save) {
      this.setProjectItems(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): IProjectItem {
    const projectItem: IProjectItem = this.convertProjectItem(res.body);
    this.setProjectItem(projectItem);
    return projectItem;
  }

  convertProjectItems(res: IProjectItem[] | null): IProjectItem[] {
    if (res && res?.length > 0) {
      return res.map(projectItem => {
        return this.convertProjectItem(projectItem);
      });
    }
    return [];
  }

  convertProjectItem(projectItem: any): IProjectItem {
    return new ProjectItem(projectItem);
  }

  setProjectItems(req: queryType | null = null): void {
    this.projectItems = req!.projectItems;
    if (req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.projectItems$.next(req);
  }

  setProjectItem(projectItem: IProjectItem | null = null): void {
    this.projectItem = projectItem;
    this.projectItem$.next(this.projectItem);
  }

  clearProjectItems(): void {
    this.projectItems = null;
    this.projectItems$.next(null);
    this.totalCount$.next(0);
  }

  clearProjectItem(): void {
    this.projectItem = null;
    this.projectItem$.next(null);
    this.isOpportunity = false;
  }

  protected convertDateFromClient(projectItem: IProjectItem): IProjectItem {
    return Object.assign({}, projectItem, {
      startDate: projectItem.startDate?.isValid() ? projectItem.startDate.toJSON() : undefined,
      expectedDate: projectItem.expectedDate?.isValid() ? projectItem.expectedDate.toJSON() : undefined,
      endDate: projectItem.endDate?.isValid() ? projectItem.endDate.toJSON() : undefined,
      closeDate: projectItem.closeDate?.isValid() ? projectItem.closeDate.toJSON() : undefined,
      createdDate: projectItem.createdDate?.isValid() ? projectItem.createdDate.toJSON() : undefined,
      lastModifiedDate: projectItem.lastModifiedDate?.isValid() ? projectItem.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.expectedDate = res.body.expectedDate ? moment(res.body.expectedDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
      res.body.closeDate = res.body.closeDate ? moment(res.body.closeDate) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((projectItem: IProjectItem) => {
        projectItem.startDate = projectItem.startDate ? moment(projectItem.startDate) : undefined;
        projectItem.expectedDate = projectItem.expectedDate ? moment(projectItem.expectedDate) : undefined;
        projectItem.endDate = projectItem.endDate ? moment(projectItem.endDate) : undefined;
        projectItem.closeDate = projectItem.closeDate ? moment(projectItem.closeDate) : undefined;
        projectItem.createdDate = projectItem.createdDate ? moment(projectItem.createdDate) : undefined;
        projectItem.lastModifiedDate = projectItem.lastModifiedDate ? moment(projectItem.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

  protected convertDateArrayFromClient(res: IProjectItem[]): IProjectItem[] {
    if (res) {
      res = res.map((projectItem: IProjectItem) => {
        return this.convertDateFromClient(projectItem);
      });
    }
    return res;
  }

}
