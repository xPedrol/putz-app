import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getTimeLineEventIdentifier, ITimeLineEvent, TimeLineEvent} from '../models/time-line-event.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {ITimeLineEventEvaluation} from '../models/time-line-event-evaluation.model';

export type queryType = { timeLineEvents: ITimeLineEvent[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<ITimeLineEvent>;
export type EntityArrayResponseType = HttpResponse<ITimeLineEvent[]>;

@Injectable({providedIn: 'root'})
export class TimeLineEventService {
  timeLineEvents$: BehaviorSubject<queryType | null>;

  timeLineEvent$: BehaviorSubject<ITimeLineEvent | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = '';

  constructor(
    protected http: HttpClient,
  ) {
    this.timeLineEvents$ = new BehaviorSubject<queryType | null>(null);

    this.timeLineEvent$ = new BehaviorSubject<ITimeLineEvent | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
    this.resourceUrl = `${environment.API_URL}admin/timelines/events`;
  }

  create(timeLineEvent: ITimeLineEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineEvent);
    return this.http
      .post<ITimeLineEvent>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createByFreelancer(timeLineEvent: ITimeLineEvent, {projectId, stepId}: any): Observable<ITimeLineEvent> {
    const copy = this.convertDateFromClient(timeLineEvent);
    return this.http
      .post<ITimeLineEvent>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  update(timeLineEvent: ITimeLineEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineEvent);
    return this.http
      .put<ITimeLineEvent>(`${this.resourceUrl}/${getTimeLineEventIdentifier(timeLineEvent) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateWithIds(timeLineEvent: ITimeLineEvent, {projectId, stepId, eventId}: any): Observable<ITimeLineEvent> {
    const copy = this.convertDateFromClient(timeLineEvent);
    return this.http
      .put<ITimeLineEvent>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  partialUpdate(timeLineEvent: ITimeLineEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(timeLineEvent);
    return this.http
      .patch<ITimeLineEvent>(`${this.resourceUrl}/${getTimeLineEventIdentifier(timeLineEvent) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITimeLineEvent>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITimeLineEvent[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryWithIds({projectId, stepId}: any): Observable<ITimeLineEvent[]> {
    return this.http
      .get<ITimeLineEvent[]>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events`);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  deleteWithIds({projectId, stepId, eventId}: any): Observable<HttpResponse<{}>> {
    return this.http.delete(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}`, {observe: 'response'});
  }

  approveEvent({projectId, stepId, eventId}: any, evaluation: ITimeLineEventEvaluation): Observable<ITimeLineEvent> {
    return this.http
      .post<ITimeLineEvent>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/approve`, evaluation, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  patchUpdate({projectId, stepId, eventId}: any, event: ITimeLineEvent): Observable<ITimeLineEvent> {
    return this.http
      .patch<ITimeLineEvent>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}`, event, {
        observe: 'response',
        headers: {'Content-Type': 'application/merge-patch+json'}
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  declineEvent({projectId, stepId, eventId}: any, evaluation: ITimeLineEventEvaluation): Observable<ITimeLineEvent> {
    return this.http
      .post<ITimeLineEvent>(`${environment.API_URL}projects/${projectId}/steps/${stepId}/timeline/events/${eventId}/request-change`, evaluation, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  addTimeLineEventToCollectionIfMissing(
    timeLineEventCollection: ITimeLineEvent[],
    ...timeLineEventsToCheck: (ITimeLineEvent | null | undefined)[]
  ): ITimeLineEvent[] {
    const timeLineEvents: ITimeLineEvent[] = timeLineEventsToCheck.filter(isPresent);
    if (timeLineEvents.length > 0) {
      const timeLineEventCollectionIdentifiers = timeLineEventCollection.map(
        timeLineEventItem => getTimeLineEventIdentifier(timeLineEventItem)!
      );
      const timeLineEventsToAdd = timeLineEvents.filter(timeLineEventItem => {
        const timeLineEventIdentifier = getTimeLineEventIdentifier(timeLineEventItem);
        if (timeLineEventIdentifier == null || timeLineEventCollectionIdentifiers.includes(timeLineEventIdentifier)) {
          return false;
        }
        timeLineEventCollectionIdentifiers.push(timeLineEventIdentifier);
        return true;
      });
      return [...timeLineEventsToAdd, ...timeLineEventCollection];
    }
    return timeLineEventCollection;
  }

  setTimeLineEvents(req: queryType | null = null): void {
    this.timeLineEvents$.next(req);
  }

  setTimeLineEvent(event: ITimeLineEvent | null = null): void {
    this.timeLineEvent$.next(event);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const timeLineEvents: ITimeLineEvent[] = this.convertTimeLineEvents(res.body);
    const req = {timeLineEvents, headers: res.headers};
    this.setTimeLineEvents(req);
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): ITimeLineEvent {
    const timeLineEvents: ITimeLineEvent = this.convertTimeLineEvent(res.body);
    this.setTimeLineEvent(timeLineEvents);
    return timeLineEvents;
  }

  convertTimeLineEvents(pSteps: ITimeLineEvent[] | null): ITimeLineEvent[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(projectStep => {
        return this.convertTimeLineEvent(projectStep);
      });
    }
    return [];
  }

  convertTimeLineEvent(timeLineEvent: ITimeLineEvent | null): ITimeLineEvent {
    return new TimeLineEvent(timeLineEvent);
  }

  clearTimeLineEvent(): void {
    this.timeLineEvent$.next(null);
  }

  clearTimeLineEvents(): void {
    this.timeLineEvents$.next(null);
    this.totalCount$.next(0);
  }

  getEventIndexById(eventId: number, events?: ITimeLineEvent[] | null | undefined): number | null {
    let index = null;
    const timeLineEvents: ITimeLineEvent[] | undefined = events ?? this.timeLineEvents$?.getValue()?.timeLineEvents;
    if (timeLineEvents) {
      if (timeLineEvents && timeLineEvents.length > 0) {
        timeLineEvents.forEach((event, i) => {
          if (event.id === eventId) {
            index = i;
          }
        });
      }
    }
    return index;
  }

  protected convertDateFromClient(timeLineEvent: ITimeLineEvent): ITimeLineEvent {
    return Object.assign({}, timeLineEvent, {
      conclusionDate: timeLineEvent.conclusionDate?.isValid() ? timeLineEvent.conclusionDate.toJSON() : undefined,
      createdDate: timeLineEvent.createdDate?.isValid() ? timeLineEvent.createdDate.toJSON() : undefined,
      lastModifiedDate: timeLineEvent.lastModifiedDate?.isValid() ? timeLineEvent.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.conclusionDate = res.body.conclusionDate ? moment(res.body.conclusionDate) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((timeLineEvent: ITimeLineEvent) => {
        timeLineEvent.conclusionDate = timeLineEvent.conclusionDate ? moment(timeLineEvent.conclusionDate) : undefined;
        timeLineEvent.createdDate = timeLineEvent.createdDate ? moment(timeLineEvent.createdDate) : undefined;
        timeLineEvent.lastModifiedDate = timeLineEvent.lastModifiedDate ? moment(timeLineEvent.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
