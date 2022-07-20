import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getCompetenceIdentifier, ICompetence} from '../models/competence.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';
import {CompetenceGuide} from '../models/competence-guide.model';
import {environment} from '../../environments/environment';

export type queryType = { competences: ICompetence[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<ICompetence>;
export type EntityArrayResponseType = HttpResponse<ICompetence[]>;

@Injectable({providedIn: 'root'})
export class CompetenceService {
  competences$: BehaviorSubject<queryType | null>;

  competence$: BehaviorSubject<ICompetence | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/competences`;

  constructor(
    protected http: HttpClient,
  ) {
    this.competences$ = new BehaviorSubject<queryType | null>(null);
    this.competence$ = new BehaviorSubject<ICompetence | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  create(competence: ICompetence): Observable<ICompetence> {
    const copy = this.convertDateFromClient(competence);
    return this.http
      .post<ICompetence>(this.resourceUrl, copy,)
      .pipe(map((res: ICompetence) => this.convertCompetence(res)));
  }

  update(competence: ICompetence): Observable<ICompetence> {
    const copy = this.convertDateFromClient(competence);
    return this.http
      .put<ICompetence>(`${this.resourceUrl}/${getCompetenceIdentifier(competence) as number}`, copy)
      .pipe(map((res: ICompetence) => this.convertCompetence(res)));
  }

  partialUpdate(competence: ICompetence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(competence);
    return this.http
      .patch<ICompetence>(`${this.resourceUrl}/${getCompetenceIdentifier(competence) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<ICompetence | null> {
    return this.http
      .get<ICompetence>(`${this.resourceUrl}/${id}`)
      .pipe(map((res: ICompetence | null) => this.convertCompetence(res)));
  }

  queryAdmin(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICompetence[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  query(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICompetence[]>(`${environment.API_URL}competences`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  addCompetenceToCollectionIfMissing(
    competenceCollection: ICompetence[],
    ...competencesToCheck: (ICompetence | null | undefined)[]
  ): ICompetence[] {
    const competences: ICompetence[] = competencesToCheck.filter(isPresent);
    if (competences.length > 0) {
      const competenceCollectionIdentifiers = competenceCollection.map(competenceItem => getCompetenceIdentifier(competenceItem)!);
      const competencesToAdd = competences.filter(competenceItem => {
        const competenceIdentifier = getCompetenceIdentifier(competenceItem);
        if (competenceIdentifier == null || competenceCollectionIdentifiers.includes(competenceIdentifier)) {
          return false;
        }
        competenceCollectionIdentifiers.push(competenceIdentifier);
        return true;
      });
      return [...competencesToAdd, ...competenceCollection];
    }
    return competenceCollection;
  }

  setCompetences(req: queryType | null = null): void {
    if (req && req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.competences$.next(req);
  }

  setCompetence(project: ICompetence | null = null): void {
    this.competence$.next(project);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const competences: ICompetence[] = this.convertCompetences(res.body);
    const req = {competences, headers: res.headers};
    this.setCompetences(req);
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): ICompetence {
    const competenceGuide: ICompetence = this.convertCompetence(res.body);
    this.setCompetence(competenceGuide);
    return competenceGuide;
  }

  convertCompetences(competenceGuides: ICompetence[] | null): ICompetence[] {
    if (competenceGuides && competenceGuides?.length > 0) {
      return competenceGuides.map(competenceGuide => {
        return this.convertCompetence(competenceGuide);
      });
    }
    return [];
  }

  convertCompetence(competenceGuide: ICompetence | null): ICompetence {
    // this.setProjectStep(pStepN);
    return new CompetenceGuide(competenceGuide);
  }

  clearCompetence(): void {
    this.competence$.next(null);
  }

  clearCompetences(): void {
    this.competences$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(competence: ICompetence): ICompetence {
    return Object.assign({}, competence, {
      createdDate: competence.createdDate?.isValid() ? competence.createdDate.toJSON() : undefined,
      lastModifiedDate: competence.lastModifiedDate?.isValid() ? competence.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((competence: ICompetence) => {
        competence.createdDate = competence.createdDate ? moment(competence.createdDate) : undefined;
        competence.lastModifiedDate = competence.lastModifiedDate ? moment(competence.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

  getProjectIndexById(competenceId: number, competences: ICompetence[] | null | undefined = []): number | null {
    let index = null;
    if (competences) {
      if (competences && competences.length > 0) {
        competences.forEach((project, i) => {
          if (project.id === competenceId) {
            index = i;
          }
        });
      }
    }
    return index;
  }
}
