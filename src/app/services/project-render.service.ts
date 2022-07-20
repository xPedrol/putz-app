import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {IProjectRender, ProjectRender} from '../models/project-render.model';
import {IRenderAverageTime} from '../models/renderAverageTime.model';
import {createRequestOption} from '../core/utils/request-util';
import {IProjectRenderGroupName} from '../models/project-render-group-name.model';
import {IProjectRenderError} from '../models/project-render-error.model';

export type queryType = { projectRenders: IProjectRender[], headers: HttpHeaders };
export type EntityResponseType = HttpResponse<IProjectRender>;
export type EntityArrayResponseType = HttpResponse<IProjectRender[]>;

@Injectable({providedIn: 'root'})
export class ProjectRenderService {
  projectRenders: IProjectRender[] | null | undefined;
  projectRenders$: BehaviorSubject<queryType | null>;

  projectRender: IProjectRender | null | undefined;
  projectRender$: BehaviorSubject<IProjectRender | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = '';

  constructor(protected http: HttpClient) {
    this.projectRenders = null;
    this.projectRenders$ = new BehaviorSubject<queryType | null>(null);

    this.projectRender = null;
    this.projectRender$ = new BehaviorSubject<IProjectRender | null>(null);
    this.resourceUrl = `${environment.API_URL}projects`;

    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  find(id: number, save = true): Observable<IProjectRender> {
    return this.http
      .get<IProjectRender>(`${environment.API_URL}projects/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  getRenderAveragePerVideo(renderSlug: string): Observable<IRenderAverageTime> {
    return this.http
      .get<IRenderAverageTime>(`${environment.API_URL}render/${renderSlug}/info/average-time-render`);
  }

  getRenderAveragePerVideoAllProcess(renderSlug: string): Observable<IRenderAverageTime> {
    return this.http
      .get<IRenderAverageTime>(`${environment.API_URL}render/${renderSlug}/info/average-time-start-until-exit`);
  }

  getRenderEndPrevision(renderSlug: string): Observable<number> {
    return this.http
      .get<number>(`${environment.API_URL}render/${renderSlug}/info/end-prevision`);
  }

  synchronizeAudioNamesByRenderId(renderId: number): Observable<IProjectRenderGroupName[]> {
    return this.http
      .put<IProjectRenderGroupName[]>(`${environment.API_URL}projects/renders/${renderId}/sync/name/audios`, {});
  }

  getAllNamesApprovedByRenderSlug(renderSlug: string, req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http
      .get<any>(`${environment.API_URL}public/projects/renders/${renderSlug}/names`, {
        params: options,
        observe: 'response'
      });
  }


  findWithProjectIdAndRenderId(projectId: number, renderId: number): Observable<IProjectRender> {
    return this.http
      .get<IProjectRender>(`${environment.API_URL}projects/${projectId}/renders/${renderId}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  getProjectRenderErrors(projectRenderSlug?: string): Observable<IProjectRenderError[]> {
    const params = {};
    if(projectRenderSlug){
      params['slug'] = projectRenderSlug;
    }
    return this.http
      .get<any>(`${environment.API_URL}render/info/render-error`, {params});
  }

  setProjects(req: queryType | null = null): void {
    this.projectRenders = req!.projectRenders;
    this.projectRenders$.next(req);
  }

  setProject(projectRender: IProjectRender | null = null): void {
    this.projectRender = projectRender;
    this.projectRender$.next(this.projectRender);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const projectRenders: IProjectRender[] = this.convertProjects(res.body);
    const req = {projectRenders, headers: res.headers};
    this.setProjects(req);
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): IProjectRender {
    const projectRender: IProjectRender = this.convertProject(res.body);
    this.setProject(projectRender);
    return projectRender;
  }

  convertProjects(projects: IProjectRender[] | null): IProjectRender[] {
    if (projects && projects?.length > 0) {
      return projects.map(project => {
        return this.convertProject(project);
      });
    }
    return [];
  }

  convertProject(projectRender: IProjectRender | null): IProjectRender {
    projectRender = new ProjectRender(projectRender);
    return projectRender as IProjectRender;
  }


  clearProject(): void {
    this.projectRender = null;
    this.projectRender$.next(null);
  }

  clearProjects(): void {
    this.projectRenders = null;
    this.projectRenders$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(project: IProjectRender): IProjectRender {
    return Object.assign({}, project, {
      createdDate: project.createdDate?.isValid() ? project.createdDate.toJSON() : undefined,
      lastModifiedDate: project.lastModifiedDate?.isValid() ? project.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((project: IProjectRender) => {
        project.createdDate = project.createdDate ? moment(project.createdDate) : undefined;
        project.lastModifiedDate = project.lastModifiedDate ? moment(project.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
