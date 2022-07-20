import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {
  getTimeLineAttachmentIdentifier,
  ITimeLineAttachment,
  TimeLineAttachment
} from '../models/time-line-attachment.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import {environment} from '../../environments/environment';

export type queryType = { timeLineAttachments: ITimeLineAttachment[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<ITimeLineAttachment>;
export type EntityArrayResponseType = HttpResponse<ITimeLineAttachment[]>;

@Injectable({providedIn: 'root'})
export class TimeLineAttachmentService {
  timeLineAttachments$: BehaviorSubject<queryType | null>;

  timeLineEvent$: BehaviorSubject<ITimeLineAttachment | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/timelines/attachments`;

  constructor(
    protected http: HttpClient,
  ) {
    this.timeLineAttachments$ = new BehaviorSubject<queryType | null>(null);

    this.timeLineEvent$ = new BehaviorSubject<ITimeLineAttachment | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  create(timeLineAttachment: ITimeLineAttachment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineAttachment);
    return this.http
      .post<ITimeLineAttachment>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createByFreelancer(file: File, {
    projectId,
    stepId,
    eventId
  }: any): Observable<ITimeLineAttachment> {
    // const copy = this.convertDateFromClient(timeLineAttachment);
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<ITimeLineAttachment>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/attachments`, formData, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  createByFreelancerWithLink(attachment: ITimeLineAttachment, {
    projectId,
    stepId,
    eventId
  }: any): Observable<ITimeLineAttachment> {
    return this.http
      .post<ITimeLineAttachment>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/link`, attachment, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  update(timeLineAttachment: ITimeLineAttachment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineAttachment);
    return this.http
      .put<ITimeLineAttachment>(`${this.resourceUrl}/${getTimeLineAttachmentIdentifier(timeLineAttachment) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  uploadAttachmentFile({projectId, stepId}: any, file: File): Observable<string> {
    return this.http
      .post<string>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/upload`, file);
  }

  partialUpdate(timeLineAttachment: ITimeLineAttachment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineAttachment);
    return this.http
      .patch<ITimeLineAttachment>(`${this.resourceUrl}/${getTimeLineAttachmentIdentifier(timeLineAttachment) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITimeLineAttachment>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }


  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITimeLineAttachment[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryWithIds({projectId, stepId, eventId}: any, save = true): Observable<queryType> {
    return this.http
      .get<ITimeLineAttachment[]>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/attachments`, {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  deleteWithIds({projectId, stepId, eventId, attachmentId}: any): Observable<HttpResponse<{}>> {
    return this.http.delete(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/attachments/${attachmentId}`, {observe: 'response'});
  }

  addTimeLineAttachmentToCollectionIfMissing(
    timeLineAttachmentCollection: ITimeLineAttachment[],
    ...timeLineAttachmentsToCheck: (ITimeLineAttachment | null | undefined)[]
  ): ITimeLineAttachment[] {
    const timeLineAttachments: ITimeLineAttachment[] = timeLineAttachmentsToCheck.filter(isPresent);
    if (timeLineAttachments.length > 0) {
      const timeLineAttachmentCollectionIdentifiers = timeLineAttachmentCollection.map(
        timeLineAttachmentItem => getTimeLineAttachmentIdentifier(timeLineAttachmentItem)!
      );
      const timeLineAttachmentsToAdd = timeLineAttachments.filter(timeLineAttachmentItem => {
        const timeLineAttachmentIdentifier = getTimeLineAttachmentIdentifier(timeLineAttachmentItem);
        if (timeLineAttachmentIdentifier == null || timeLineAttachmentCollectionIdentifiers.includes(timeLineAttachmentIdentifier)) {
          return false;
        }
        timeLineAttachmentCollectionIdentifiers.push(timeLineAttachmentIdentifier);
        return true;
      });
      return [...timeLineAttachmentsToAdd, ...timeLineAttachmentCollection];
    }
    return timeLineAttachmentCollection;
  }

  setTimeLineAttachments(req: queryType | null = null): void {
    this.timeLineAttachments$.next(req);
  }

  setTimeLineAttachment(event: ITimeLineAttachment | null = null): void {
    this.timeLineEvent$.next(event);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save: boolean): queryType {
    const timeLineAttachments: ITimeLineAttachment[] = this.convertTimeLineAttachments(res.body);
    const req = {timeLineAttachments, headers: res.headers};
    if (save) {
      this.setTimeLineAttachments(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): ITimeLineAttachment {
    const timeLineAttachments: ITimeLineAttachment = this.convertTimeLineAttachment(res.body);
    this.setTimeLineAttachment(timeLineAttachments);
    return timeLineAttachments;
  }

  convertTimeLineAttachments(pSteps: ITimeLineAttachment[] | null): ITimeLineAttachment[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(projectStep => {
        return this.convertTimeLineAttachment(projectStep);
      });
    }
    return [];
  }

  convertTimeLineAttachment(timeLineEvent: ITimeLineAttachment | null): ITimeLineAttachment {
    return new TimeLineAttachment(timeLineEvent);
  }

  clearTimeLineAttachment(): void {
    this.timeLineEvent$.next(null);
  }

  clearTimeLineAttachments(): void {
    this.timeLineAttachments$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(timeLineAttachment: ITimeLineAttachment): ITimeLineAttachment {
    return Object.assign({}, timeLineAttachment, {
      createdDate: timeLineAttachment.createdDate?.isValid() ? timeLineAttachment.createdDate.toJSON() : undefined,
      lastModifiedDate: timeLineAttachment.lastModifiedDate?.isValid() ? timeLineAttachment.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((timeLineAttachment: ITimeLineAttachment) => {
        timeLineAttachment.createdDate = timeLineAttachment.createdDate ? moment(timeLineAttachment.createdDate) : undefined;
        timeLineAttachment.lastModifiedDate = timeLineAttachment.lastModifiedDate ? moment(timeLineAttachment.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
