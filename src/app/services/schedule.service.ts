import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getScheduleIdentifier, ISchedule} from '../models/schedule.model';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';

export type EntityResponseType = HttpResponse<ISchedule>;
export type EntityArrayResponseType = HttpResponse<ISchedule[]>;

@Injectable({providedIn: 'root'})
export class ScheduleService {
  protected resourceUrl = `${environment.API_URL}admin/schedules`;

  constructor(protected http: HttpClient) {
  }

  create(schedule: ISchedule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(schedule);
    return this.http
      .post<ISchedule>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(schedule: ISchedule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(schedule);
    return this.http
      .put<ISchedule>(`${this.resourceUrl}/${getScheduleIdentifier(schedule) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(schedule: ISchedule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(schedule);
    return this.http
      .patch<ISchedule>(`${this.resourceUrl}/${getScheduleIdentifier(schedule) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISchedule>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findScheduleNamesByProjectId(projectId: number): Observable<string[]> {
    return this.http
      .get<string[]>(`${environment.API_URL}projects/${projectId}/scheduleNames`);
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISchedule[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  addScheduleToCollectionIfMissing(scheduleCollection: ISchedule[], ...schedulesToCheck: (ISchedule | null | undefined)[]): ISchedule[] {
    const schedules: ISchedule[] = schedulesToCheck.filter(isPresent);
    if (schedules.length > 0) {
      const scheduleCollectionIdentifiers = scheduleCollection.map(scheduleItem => getScheduleIdentifier(scheduleItem)!);
      const schedulesToAdd = schedules.filter(scheduleItem => {
        const scheduleIdentifier = getScheduleIdentifier(scheduleItem);
        if (scheduleIdentifier == null || scheduleCollectionIdentifiers.includes(scheduleIdentifier)) {
          return false;
        }
        scheduleCollectionIdentifiers.push(scheduleIdentifier);
        return true;
      });
      return [...schedulesToAdd, ...scheduleCollection];
    }
    return scheduleCollection;
  }

  protected convertDateFromClient(schedule: ISchedule): ISchedule {
    return Object.assign({}, schedule, {
      createdDate: schedule.createdDate?.isValid() ? schedule.createdDate.toJSON() : undefined,
      lastModifiedDate: schedule.lastModifiedDate?.isValid() ? schedule.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((schedule: ISchedule) => {
        schedule.createdDate = schedule.createdDate ? moment(schedule.createdDate) : undefined;
        schedule.lastModifiedDate = schedule.lastModifiedDate ? moment(schedule.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
