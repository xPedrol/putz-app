import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import IJob, {Job} from '../models/job.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {createRequestOption} from '../core/utils/request-util';

export type queryType = { jobs: IJob[], headers: HttpHeaders };
export type EntityResponseType = HttpResponse<IJob>;
export type EntityArrayResponseType = HttpResponse<IJob[]>;

@Injectable({
  providedIn: 'root'
})
export class JobService {
  jobs$: BehaviorSubject<queryType | null>;
  job$: BehaviorSubject<IJob | null>;
  totalCount$: BehaviorSubject<number>;
  baseUrl: string;
  baseUrlRender: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'nexrender-secret': 'myapisecret',
    }),
  };

  constructor(
    private http: HttpClient,
  ) {
    this.jobs$ = new BehaviorSubject<queryType | null>(null);
    this.job$ = new BehaviorSubject<IJob | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
    this.baseUrlRender = `${environment.RENDER_URL}render/api/v1/`;
    this.baseUrl = `${environment.API_URL}`;
  }

  getAllJobs(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    // return this.http.get<IJob[]>(`${this.baseUrlRender}jobs`, {...this.httpOptions, observe: 'response', params: options})
    //   .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
    return this.http.get<IJob[]>(`${this.baseUrl}render/jobs`, {...this.httpOptions, observe: 'response', params: options})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  getJobByRenderItemUid(uid: string): Observable<IJob> {
//    return this.http.get<IJob>(`${this.baseUrlRender}jobs/${uid}`, this.httpOptions);
    return this.http.get<any>(`${this.baseUrl}render/jobs/${uid}`, this.httpOptions);
  }

  getJobStatusByRenderItemUid(uid: string): Observable<any> {
//    return this.http.get<any>(`${this.baseUrlRender}jobs/${uid}/status`, this.httpOptions);
    return this.http.get<any>(`${this.baseUrl}render/jobs/${uid}/status`);
  }

  sendToRender(json: any): Observable<any> {
    return this.http
      .post(environment.RENDER_URL + 'render/api/v1/jobs', json, this.httpOptions);
    // return this.http
    //   .post(`${this.baseUrl}render/jobs/${uid}/status`, json, this.httpOptions);
  }


  deleteJob(uid: string): Observable<any> {
    return this.http
      .delete(`${this.baseUrlRender}jobs/${uid}`, this.httpOptions);
  }

  setJobs(req: queryType | null = null): void {
    this.jobs$.next(req);
  }

  setJob(job: IJob | null = null): void {
    this.job$.next(job);
  }


  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const jobs: IJob[] = this.convertJobs(res.body);
    this.totalCount$.next(Number(res.headers.get('Content-Length')));
    const req = {jobs, headers: res.headers};
    this.setJobs(req);
    return req;
  }

  convertJobs(jobs: IJob[] | null): IJob[] {
    if (jobs && jobs?.length > 0) {
      return jobs.map(competenceGuide => {
        return this.convertJob(competenceGuide);
      });
    }
    return [];
  }

  convertJob(competenceGuide: IJob | null): IJob {
    // this.setProjectStep(pStepN);
    return new Job(competenceGuide);
  }

  clearJob(): void {
    this.job$.next(null);
  }

  clearJobs(): void {
    this.jobs$.next(null);
    this.totalCount$.next(0);
  }
}
