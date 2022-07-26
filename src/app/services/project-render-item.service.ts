import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  getProjectRenderItemIdentifier,
  IProjectRenderItem,
  ProjectRenderItem
} from '../models/project-render-item.model';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';

export type queryType = { projectRenderItems: IProjectRenderItem[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<IProjectRenderItem>;
export type EntityArrayResponseType = HttpResponse<IProjectRenderItem[]>;

@Injectable({providedIn: 'root'})
export class ProjectRenderItemService {
  projectRenderItems$: BehaviorSubject<queryType | null>;

  projectRenderItem$: BehaviorSubject<IProjectRenderItem | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/projects/renderitems`;

  constructor(protected http: HttpClient) {
    this.projectRenderItems$ = new BehaviorSubject<queryType | null>(null);

    this.projectRenderItem$ = new BehaviorSubject<IProjectRenderItem | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  createByAdmin(projectRenderItem: IProjectRenderItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectRenderItem);
    return this.http
      .post<IProjectRenderItem>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  create(projectRenderItem: IProjectRenderItem, {renderId}: any): Observable<IProjectRenderItem> {
    const copy = this.convertDateFromClient(projectRenderItem);
    return this.http
      .post<IProjectRenderItem>(`${environment.API_URL}renders/${renderId}/items`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  reRenderItem(projectRenderId: number, projectRenderItemId: number, projectRenderItem: IProjectRenderItem): Observable<IProjectRenderItem> {
    return this.http
      .put<IProjectRenderItem>(`${environment.API_URL}renders/${projectRenderId}/items/${projectRenderItemId}/rerender`, projectRenderItem, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  reRenderItemInSamba(projectRenderItemId: number): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}projects/renders/itens/${projectRenderItemId}/samba/send-video`, {});
  }

  createWithForm(form: any, formSlug: string, renderpass: string): Observable<IProjectRenderItem> {
    return this.http
      .post<IProjectRenderItem>(`${environment.API_URL}render/${formSlug}/items`, form, {
        observe: 'response',
        params: {password: renderpass}
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  createWithFormAndConfirmation(form: any, formSlug: string): Observable<IProjectRenderItem> {
    return this.http
      .post<IProjectRenderItem>(`${environment.API_URL}render/${formSlug}/items/precadastro`, form, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  private iProjectRenderItemObservable: Observable<IProjectRenderItem>;

  uploadCsv(csv: File, formSlug: string, csvConfig?: any): Observable<any> {
    const formData = new FormData();
    formData.append('csv', csv, 'csv');
    Object.keys(csvConfig).forEach(key => {
      if (key) {
        formData.append(key, String(csvConfig[key]));
      }
    });
    this.iProjectRenderItemObservable = this.http
      .post<IProjectRenderItem>(`${environment.API_URL}render/${formSlug}/items/csv`, formData);
    return this.iProjectRenderItemObservable;
  }

  getValidatedNames(projectRenderSlug: string, req?: any): Observable<string[]> {
    const options = createRequestOption(req);
    return this.http
      .get<string[]>(`${environment.API_URL}public/projects/renders/${projectRenderSlug}/names`, {params: options});
  }


  updateByAdmin(projectRenderItem: IProjectRenderItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectRenderItem);
    return this.http
      .put<IProjectRenderItem>(`${this.resourceUrl}/${getProjectRenderItemIdentifier(projectRenderItem) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(projectRenderItem: IProjectRenderItem, {renderId, itemId}: any): Observable<IProjectRenderItem> {
    const copy = this.convertDateFromClient(projectRenderItem);
    return this.http
      .put<IProjectRenderItem>(`${environment.API_URL}renders/${renderId}/items/${itemId}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }


  exportCsv(renderId: number, req: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http
      .get<any>(`${environment.API_URL}renders/${renderId}/items/exported`, {
        params: options
      });
  }

  getProjectRenderItemJob(uid: string, options?: any): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}render/jobs/${uid}/status`, {headers: options});
  }


  partialUpdate(projectRenderItem: IProjectRenderItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(projectRenderItem);
    return this.http
      .patch<IProjectRenderItem>(`${this.resourceUrl}/${getProjectRenderItemIdentifier(projectRenderItem) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProjectRenderItem>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  queryByAdmin(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectRenderItem[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query({renderId}: any, req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectRenderItem[]>(`${environment.API_URL}render/jobs`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  queryByRenderId({renderId}: any, req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectRenderItem[]>(`${environment.API_URL}renders/${renderId}/items`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  findRenderItem({renderId, itemId}: any, req?: any, save = true): Observable<IProjectRenderItem> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectRenderItem>(`${environment.API_URL}renders/${renderId}/items/${itemId}`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res, save)));
  }

  findRenderPublicItem({renderId, itemId}: any, req?: any, save = true): Observable<IProjectRenderItem> {
    const options = createRequestOption(req);
    return this.http
      .get<IProjectRenderItem>(`${environment.API_URL}render/${renderId}/items/${itemId}`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res, save)));
  }

  delete(id: number): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  addProjectRenderItemToCollectionIfMissing(
    projectRenderItemCollection: IProjectRenderItem[],
    ...projectRenderItemsToCheck: (IProjectRenderItem | null | undefined)[]
  ): IProjectRenderItem[] {
    const projectRenderItems: IProjectRenderItem[] = projectRenderItemsToCheck.filter(isPresent);
    if (projectRenderItems.length > 0) {
      const projectRenderItemCollectionIdentifiers = projectRenderItemCollection.map(
        projectRenderItemItem => getProjectRenderItemIdentifier(projectRenderItemItem)!
      );
      const projectRenderItemsToAdd = projectRenderItems.filter(projectRenderItemItem => {
        const projectRenderItemIdentifier = getProjectRenderItemIdentifier(projectRenderItemItem);
        if (projectRenderItemIdentifier == null || projectRenderItemCollectionIdentifiers.includes(projectRenderItemIdentifier)) {
          return false;
        }
        projectRenderItemCollectionIdentifiers.push(projectRenderItemIdentifier);
        return true;
      });
      return [...projectRenderItemsToAdd, ...projectRenderItemCollection];
    }
    return projectRenderItemCollection;
  }

  setProjectRenderItems(req: queryType | null = null): void {
    if (req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.projectRenderItems$.next(req);
  }

  setProjectRenderItem(project: IProjectRenderItem | null = null): void {
    this.projectRenderItem$.next(project);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save = true): queryType {
    const projectRenderItems: IProjectRenderItem[] = this.convertProjectRenderItems(res.body);
    const req = {projectRenderItems, headers: res.headers};
    if (save) {
      this.setProjectRenderItems(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType, save = true): IProjectRenderItem {
    const projectRenderItem: IProjectRenderItem = this.convertProjectRenderItem(res.body);
    if (save) {
      this.setProjectRenderItem(projectRenderItem);
    }
    return projectRenderItem;
  }

  convertProjectRenderItems(pSteps: IProjectRenderItem[] | null): IProjectRenderItem[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(projectRenderItem => {
        return this.convertProjectRenderItem(projectRenderItem);
      });
    }
    return [];
  }

  convertProjectRenderItem(item: IProjectRenderItem | null): IProjectRenderItem {
    item = new ProjectRenderItem(item);
    // this.setProjectRenderItem(pStepN);
    return item;
  }

  clearProjectRenderItem(): void {
    this.projectRenderItem$.next(null);
  }

  clearProjectRenderItems(): void {
    this.projectRenderItems$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(projectRenderItem: IProjectRenderItem): IProjectRenderItem {
    return Object.assign({}, projectRenderItem, {
      startRenderDate: projectRenderItem.startRenderDate?.isValid() ? projectRenderItem.startRenderDate.toJSON() : undefined,
      expectedRenderDate: projectRenderItem.expectedRenderDate?.isValid() ? projectRenderItem.expectedRenderDate.toJSON() : undefined,
      endRenderDate: projectRenderItem.endRenderDate?.isValid() ? projectRenderItem.endRenderDate.toJSON() : undefined,
      createdDate: projectRenderItem.createdDate?.isValid() ? projectRenderItem.createdDate.toJSON() : undefined,
      lastModifiedDate: projectRenderItem.lastModifiedDate?.isValid() ? projectRenderItem.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startRenderDate = res.body.startRenderDate ? moment(res.body.startRenderDate) : undefined;
      res.body.expectedRenderDate = res.body.expectedRenderDate ? moment(res.body.expectedRenderDate) : undefined;
      res.body.endRenderDate = res.body.endRenderDate ? moment(res.body.endRenderDate) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((projectRenderItem: IProjectRenderItem) => {
        projectRenderItem.startRenderDate = projectRenderItem.startRenderDate ? moment(projectRenderItem.startRenderDate) : undefined;
        projectRenderItem.expectedRenderDate = projectRenderItem.expectedRenderDate
          ? moment(projectRenderItem.expectedRenderDate)
          : undefined;
        projectRenderItem.endRenderDate = projectRenderItem.endRenderDate ? moment(projectRenderItem.endRenderDate) : undefined;
        projectRenderItem.createdDate = projectRenderItem.createdDate ? moment(projectRenderItem.createdDate) : undefined;
        projectRenderItem.lastModifiedDate = projectRenderItem.lastModifiedDate ? moment(projectRenderItem.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
