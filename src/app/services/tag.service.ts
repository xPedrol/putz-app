import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {getTagIdentifier, ITag, Tag} from '../models/tag.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import {environment} from '../../environments/environment';

export type EntityResponseType = HttpResponse<ITag>;
export type EntityArrayResponseType = HttpResponse<ITag[]>;
export type queryType = { tags: ITag[], headers?: HttpHeaders };

@Injectable({providedIn: 'root'})
export class TagService {
  tags$: BehaviorSubject<queryType | null>;

  tag$: BehaviorSubject<ITag | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/tags`;

  constructor(
    protected http: HttpClient,
  ) {
    this.tags$ = new BehaviorSubject<queryType | null>(null);

    this.tag$ = new BehaviorSubject<ITag | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  create(tag: ITag): Observable<ITag> {
    const copy = this.convertDateFromClient(tag);
    return this.http
      .post<ITag>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  update(tag: ITag): Observable<ITag> {
    const copy = this.convertDateFromClient(tag);
    return this.http
      .put<ITag>(`${this.resourceUrl}/${getTagIdentifier(tag) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  partialUpdate(tag: ITag): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tag);
    return this.http
      .patch<ITag>(`${this.resourceUrl}/${getTagIdentifier(tag) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<ITag> {
    return this.http
      .get<ITag>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  queryByAdmin(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITag[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  query(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITag[]>(`${environment.API_URL}tags`, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  addTagToCollectionIfMissing(tagCollection: ITag[], ...tagsToCheck: (ITag | null | undefined)[]): ITag[] {
    const tags: ITag[] = tagsToCheck.filter(isPresent);
    if (tags.length > 0) {
      const tagCollectionIdentifiers = tagCollection.map(tagItem => getTagIdentifier(tagItem)!);
      const tagsToAdd = tags.filter(tagItem => {
        const tagIdentifier = getTagIdentifier(tagItem);
        if (tagIdentifier == null || tagCollectionIdentifiers.includes(tagIdentifier)) {
          return false;
        }
        tagCollectionIdentifiers.push(tagIdentifier);
        return true;
      });
      return [...tagsToAdd, ...tagCollection];
    }
    return tagCollection;
  }

  setTags(req: queryType | null = null): void {
    if (req && req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.tags$.next(req);
  }

  setTag(tag: ITag | null = null): void {
    this.tag$.next(tag);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const tags: ITag[] = this.convertTags(res.body);
    const req = {tags, headers: res.headers};
    this.setTags(req);
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): ITag {
    const tag: ITag = this.convertTag(res.body);
    this.setTag(tag);
    return tag;
  }

  convertTags(pSteps: ITag[] | null): ITag[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(tag => {
        return this.convertTag(tag);
      });
    }
    return [];
  }

  convertTag(pStep: ITag | null): ITag {
    const tagN = new Tag(pStep);
    // this.setTag(pStepN);
    return tagN;
  }

  clearTag(): void {
    this.tag$.next(null);
  }

  clearTags(): void {
    this.tags$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(tag: ITag): ITag {
    return Object.assign({}, tag, {
      createdDate: tag.createdDate?.isValid() ? tag.createdDate.toJSON() : undefined,
      lastModifiedDate: tag.lastModifiedDate?.isValid() ? tag.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((tag: ITag) => {
        tag.createdDate = tag.createdDate ? moment(tag.createdDate) : undefined;
        tag.lastModifiedDate = tag.lastModifiedDate ? moment(tag.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
