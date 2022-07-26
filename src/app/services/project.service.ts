import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {getProjectIdentifier, IProject, Project} from '../models/project.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';
import {IProjectNegotiationCalcs} from '../models/project-negotiation-calcs.model';
import {environment} from '../../environments/environment';
import {IConceptionCreation} from '../models/conception-creation.model';
import {IProjectNegotiationParams} from '../models/project-negotiation-params.model';
import {ProjectStatus} from '../models/enums/project-status.model';
import {deleteAllUndefinedFields} from '../core/utils/deleteField';
import {Moment} from "moment";

export type queryType = { projects: IProject[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<IProject>;
export type EntityArrayResponseType = HttpResponse<IProject[]>;

@Injectable({providedIn: 'root'})
export class ProjectService {
  projects: IProject[] | null | undefined;
  projects$: BehaviorSubject<queryType | null>;

  project: IProject | null | undefined;
  project$: BehaviorSubject<IProject | null>;
  negotiationCalc$: BehaviorSubject<IProjectNegotiationCalcs | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = '';

  constructor(protected http: HttpClient) {
    this.projects = null;
    this.projects$ = new BehaviorSubject<queryType | null>(null);

    this.project = null;
    this.project$ = new BehaviorSubject<IProject | null>(null);
    this.negotiationCalc$ = new BehaviorSubject<IProjectNegotiationCalcs | null>(null);
    this.resourceUrl = `${environment.API_URL}admin/projects`;

    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  createByAdmin(project: IProject): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(project);
    return this.http
      .post<IProject>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  create(project: IProject): Observable<IProject> {
    const copy = this.convertDateFromClient(project);
    return this.http
      .post<IProject>(`${environment.API_URL}projects`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  createConception(project: IConceptionCreation): Observable<IProject> {
    return this.http
      .post<IProject>(`${environment.API_URL}projects/conceptions/from`, project, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  updateProject(project: IProject): Observable<IProject> {
    const copy = this.convertDateFromClient(project);
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${project?.id}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  updateConception(projectId: number, params: IProjectNegotiationParams): Observable<IProjectNegotiationParams> {
    return this.http
      .put<IProjectNegotiationParams>(`${environment.API_URL}projects/${projectId}/negotiation`, params);
  }

  updateByAdmin(project: IProject): Observable<IProject> {
    const copy = this.convertDateFromClient(project);
    return this.http
      .patch<IProject>(`${this.resourceUrl}/${getProjectIdentifier(project) as number}`, copy,
        {observe: 'response', headers: {'Content-Type': 'application/merge-patch+json'}})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }


  getBasicNegotiation(project: IProjectNegotiationParams): Observable<IProjectNegotiationCalcs> {
    return this.http
      .post<IProjectNegotiationCalcs>(`${environment.API_URL}projects/calculator`, project).pipe(tap((negotiation) => {
        this.setNegotiation(negotiation);
      }));
  }

  getAdvancedNegotiation(project: IProjectNegotiationParams): Observable<IProjectNegotiationCalcs> {
    const params = new HttpParams().set('itemsBaseSum', project.itemsBaseSum ?? 0).set('itemsExtraBaseSum', project.extraItemsBaseSum ?? 0);
    return this.http
      .post<IProjectNegotiationCalcs>(`${environment.API_URL}projects/calculator/advanced`, project, {params}).pipe(tap((negotiation) => {
        this.setNegotiation(negotiation);
      }));
  }


  partialUpdate(project: IProject): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(project);
    return this.http
      .patch<IProject>(`${this.resourceUrl}/${getProjectIdentifier(project) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getProjectCountByStatus(status: ProjectStatus[]): Observable<number> {
    return this.http
      .get<number>(`${environment.API_URL}projects/count`, {params: {projectStatus: status}});
  }

  findByAdmin(id: number): Observable<IProject> {
    return this.http
      .get<IProject>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  find(id: number, save = true): Observable<IProject> {
    return this.http
      .get<IProject>(`${environment.API_URL}projects/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res, save)));
  }

  findProjectWithStatus(id: number, projectStatus: string): Observable<IProject> {
    return this.http
      .get<IProject>(`${environment.API_URL}projects/${projectStatus}/${id}`)
      .pipe(map((res: IProject) => {
        const project = new Project(res);
        this.setProject(project);
        return project;
      }));
  }

  findProjectsWithStatus(status: string, req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProject[]>(`${environment.API_URL}projects/${status}`, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  uploadContract(projectId: number, file: File): Observable<IProject> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<IProject>(`${environment.API_URL}projects/${projectId}/conceptions/upload-contract`, formData, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  queryByAdmin(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProject[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  query(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProject[]>(`${environment.API_URL}projects`, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  queryConceptions(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProject[]>(`${environment.API_URL}projects/conceptions`, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${environment.API_URL}projects/${id}`, {observe: 'response'});
  }

  approveBriefing(projectId: number): Observable<IProject> {
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${projectId}/briefing/approve`, null, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  approveConception(projectId: number): Observable<IProject> {
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${projectId}/conceptions/approve`, null, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  synchronizeSchedule(projectId: number): Observable<IProject> {
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${projectId}/schedule/reset`, {});
  }

  synchronizeScheduleByName(projectId: number, scheduleName: string, initialDate: Moment): Observable<IProject> {
    let options = {};
    if (initialDate && initialDate?.isValid()) {
      options = createRequestOption({initialDate: initialDate.toJSON()});
    }
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${projectId}/schedule/${scheduleName}/reset`, {}, {params: options});
  }

  closeProject(projectId: number): Observable<IProject> {
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${projectId}/close`, {});
  }

  cancelConception(projectId: number, message?: string): Observable<IProject> {
    const options = deleteAllUndefinedFields({message});
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${projectId}/conceptions/cancel`, null, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  resetBriefingToConception(projectId: number): Observable<IProject> {
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${projectId}/briefing/reset-approve`, null, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  cancelBriefing(projectId: number, message?: string): Observable<IProject> {
    const options = deleteAllUndefinedFields({message});
    return this.http
      .put<IProject>(`${environment.API_URL}projects/${projectId}/briefing/cancel`, null, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  conceptionForm(project: IConceptionCreation): Observable<IProject> {
    return this.http
      .post<IProject>(`${environment.API_URL}projects/conceptions/from`, project, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  addProjectToCollectionIfMissing(projectCollection: IProject[], ...projectsToCheck: (IProject | null | undefined)[]): IProject[] {
    const projects: IProject[] = projectsToCheck.filter(isPresent);
    if (projects.length > 0) {
      const projectCollectionIdentifiers = projectCollection.map(projectItem => getProjectIdentifier(projectItem)!);
      const projectsToAdd = projects.filter(projectItem => {
        const projectIdentifier = getProjectIdentifier(projectItem);
        if (projectIdentifier == null || projectCollectionIdentifiers.includes(projectIdentifier)) {
          return false;
        }
        projectCollectionIdentifiers.push(projectIdentifier);
        return true;
      });
      return [...projectsToAdd, ...projectCollection];
    }
    return projectCollection;
  }

  setProjects(req: queryType | null = null): void {
    this.projects = req!.projects;
    if (req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.projects$.next(req);
  }

  setProject(project: IProject | null = null): void {
    this.project = project;
    this.project$.next(this.project);
  }

  setNegotiation(negotiation: IProjectNegotiationCalcs | null = null): void {
    this.negotiationCalc$.next(negotiation);
  }

  countProjectsByYear(year: number): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}projects/count/year/${year}`);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const projects: IProject[] = this.convertProjects(res.body);
    const req = {projects, headers: res.headers};
    this.setProjects(req);
    return req;
  }

  convertEntityResponseType(res: EntityResponseType, save = true): IProject {
    const project: IProject = this.convertProject(res.body);
    if (save) {
      this.setProject(project);
    }
    return project;
  }

  convertProjects(projects: IProject[] | null): IProject[] {
    if (projects && projects?.length > 0) {
      return projects.map(project => {
        return this.convertProject(project);
      });
    }
    return [];
  }

  convertProject(project: IProject | null): IProject {
    project = new Project(project);
    // this.setProjectStep(pStepN);
    return project;
  }


  clearProject(): void {
    this.project = null;
    this.project$.next(null);
    this.negotiationCalc$.next(null);
  }

  clearProjects(): void {
    this.projects = null;
    this.projects$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(project: IProject): IProject {
    return Object.assign({}, project, {
      startDate: project.startDate?.isValid() ? project.startDate.toJSON() : undefined,
      canceledDate: project.canceledDate?.isValid() ? project.canceledDate.toJSON() : undefined,
      endDate: project.endDate?.isValid() ? project.endDate.toJSON() : undefined,
      createdDate: project.createdDate?.isValid() ? project.createdDate.toJSON() : undefined,
      lastModifiedDate: project.lastModifiedDate?.isValid() ? project.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.canceledDate = res.body.canceledDate ? moment(res.body.canceledDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((project: IProject) => {
        project.startDate = project.startDate ? moment(project.startDate) : undefined;
        project.canceledDate = project.canceledDate ? moment(project.canceledDate) : undefined;
        project.endDate = project.endDate ? moment(project.endDate) : undefined;
        project.createdDate = project.createdDate ? moment(project.createdDate) : undefined;
        project.lastModifiedDate = project.lastModifiedDate ? moment(project.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

  getProjectIndexById(projectId: number, projects: IProject[] | null | undefined = []): number | null {
    let index = null;
    if (projects) {
      if (projects && projects.length > 0) {
        projects.forEach((project, i) => {
          if (project.id === projectId) {
            index = i;
          }
        });
      }
    }
    return index;
  }
}
