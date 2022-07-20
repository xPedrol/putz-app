import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getTimeLineCommentIdentifier, ITimeLineComment, TimeLineComment} from '../models/time-line-comment.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

export type queryType = { timeLineComments: ITimeLineComment[], headers: HttpHeaders };
export type EntityResponseType = HttpResponse<ITimeLineComment>;
export type EntityArrayResponseType = HttpResponse<ITimeLineComment[]>;

@Injectable({providedIn: 'root'})
export class TimeLineCommentService {
  timeLineComments$: BehaviorSubject<queryType | null>;

  timeLineComment$: BehaviorSubject<ITimeLineComment | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/timelines/comments`;

  constructor(
    protected http: HttpClient
  ) {
    this.timeLineComments$ = new BehaviorSubject<queryType | null>(null);

    this.timeLineComment$ = new BehaviorSubject<ITimeLineComment | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  create(timeLineComment: ITimeLineComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineComment);
    return this.http
      .post<ITimeLineComment>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createWithIds(timeLineComment: ITimeLineComment, {
    projectId,
    stepId,
    eventId
  }: any): Observable<ITimeLineComment> {
    return this.http
      .post<ITimeLineComment>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/comments`, timeLineComment, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  update(timeLineComment: ITimeLineComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineComment);
    return this.http
      .put<ITimeLineComment>(`${this.resourceUrl}/${getTimeLineCommentIdentifier(timeLineComment) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateWithIds(timeLineComment: ITimeLineComment, {
    projectId,
    stepId,
    eventId,
    commentId
  }: any): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineComment);
    return this.http
      .put<ITimeLineComment>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/comments/${commentId}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateByIds(timeLineComment: ITimeLineComment, {
    projectId,
    stepId,
    eventId,
    commentId
  }: any): Observable<ITimeLineComment> {
    return this.http
      .put<ITimeLineComment>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/comments/${commentId}`, timeLineComment, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }


  partialUpdate(timeLineComment: ITimeLineComment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineComment);
    return this.http
      .patch<ITimeLineComment>(`${this.resourceUrl}/${getTimeLineCommentIdentifier(timeLineComment) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITimeLineComment>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  queryWithIds({projectId, stepId, eventId}: any, save = true): Observable<queryType> {
    return this.http
      .get<ITimeLineComment[]>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/comments`, {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITimeLineComment[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  deleteByIds({projectId, stepId, eventId, commentId}: any): Observable<{}> {
    return this.http.delete(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/comments/${commentId}`);
  }

  addTimeLineCommentToCollectionIfMissing(
    timeLineCommentCollection: ITimeLineComment[],
    ...timeLineCommentsToCheck: (ITimeLineComment | null | undefined)[]
  ): ITimeLineComment[] {
    const timeLineComments: ITimeLineComment[] = timeLineCommentsToCheck.filter(isPresent);
    if (timeLineComments.length > 0) {
      const timeLineCommentCollectionIdentifiers = timeLineCommentCollection.map(
        timeLineCommentItem => getTimeLineCommentIdentifier(timeLineCommentItem)!
      );
      const timeLineCommentsToAdd = timeLineComments.filter(timeLineCommentItem => {
        const timeLineCommentIdentifier = getTimeLineCommentIdentifier(timeLineCommentItem);
        if (timeLineCommentIdentifier == null || timeLineCommentCollectionIdentifiers.includes(timeLineCommentIdentifier)) {
          return false;
        }
        timeLineCommentCollectionIdentifiers.push(timeLineCommentIdentifier);
        return true;
      });
      return [...timeLineCommentsToAdd, ...timeLineCommentCollection];
    }
    return timeLineCommentCollection;
  }

  setTimeLineComments(req: queryType | null = null): void {
    this.timeLineComments$.next(req);
  }

  setTimeLineComment(timeLineComment: ITimeLineComment | null = null): void {
    this.timeLineComment$.next(timeLineComment);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save: boolean): queryType {
    const timeLineComments: ITimeLineComment[] = this.convertTimeLineComments(res.body);
    const req = {timeLineComments, headers: res.headers};
    if (save) {
      this.setTimeLineComments(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): ITimeLineComment {
    const timeLineComment: ITimeLineComment = this.convertTimeLineComment(res.body);
    this.setTimeLineComment(timeLineComment);
    return timeLineComment;
  }

  convertTimeLineComments(pSteps: ITimeLineComment[] | null): ITimeLineComment[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(timeLineComment => {
        return this.convertTimeLineComment(timeLineComment);
      });
    }
    return [];
  }

  convertTimeLineComment(pStep: ITimeLineComment | null): ITimeLineComment {
    return new TimeLineComment(pStep);
  }

  clearTimeLineComment(): void {
    this.timeLineComment$.next(null);
  }

  clearTimeLineComments(): void {
    this.timeLineComments$.next(null);
    this.totalCount$.next(0);
  }

  getCommentIndexById(eventId: number, events?: ITimeLineComment[] | null | undefined): number | null {
    const timeLineComments: ITimeLineComment[] | undefined = events ?? this.timeLineComments$?.getValue()?.timeLineComments;
    let index = null;
    if (timeLineComments && timeLineComments.length > 0) {
      timeLineComments.forEach((event, i) => {
        if (event.id === eventId) {
          index = i;
        }
      });
    }
    return index;
  }

  protected convertDateFromClient(timeLineComment: ITimeLineComment): ITimeLineComment {
    return Object.assign({}, timeLineComment, {
      createdDate: timeLineComment.createdDate?.isValid() ? timeLineComment.createdDate.toJSON() : undefined,
      lastModifiedDate: timeLineComment.lastModifiedDate?.isValid() ? timeLineComment.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((timeLineComment: ITimeLineComment) => {
        timeLineComment.createdDate = timeLineComment.createdDate ? moment(timeLineComment.createdDate) : undefined;
        timeLineComment.lastModifiedDate = timeLineComment.lastModifiedDate ? moment(timeLineComment.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
