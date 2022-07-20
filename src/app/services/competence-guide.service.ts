import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {CompetenceGuide, getCompetenceGuideIdentifier, ICompetenceGuide} from '../models/competence-guide.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import {environment} from '../../environments/environment';
import {ICompetence} from '../models/competence.model';


export type queryType = { competenceGuides: ICompetenceGuide[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<ICompetenceGuide>;
export type EntityArrayResponseType = HttpResponse<ICompetenceGuide[]>;

@Injectable({providedIn: 'root'})
export class CompetenceGuideService {
  competenceGuides$: BehaviorSubject<queryType | null>;

  competenceGuide$: BehaviorSubject<ICompetenceGuide | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = '';

  constructor(
    protected http: HttpClient,
  ) {
    this.competenceGuides$ = new BehaviorSubject<queryType | null>(null);
    this.competenceGuide$ = new BehaviorSubject<ICompetenceGuide | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);

    this.resourceUrl = `${environment.API_URL}admin/competences/guides`;
  }

  create(competenceGuide: ICompetenceGuide): Observable<ICompetence> {
    const copy = this.convertDateFromClient(competenceGuide);
    return this.http
      .post<ICompetenceGuide>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  update(competenceGuide: ICompetenceGuide): Observable<ICompetence> {
    const copy = this.convertDateFromClient(competenceGuide);
    return this.http
      .put<ICompetenceGuide>(`${this.resourceUrl}/${getCompetenceGuideIdentifier(competenceGuide) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  partialUpdate(competenceGuide: ICompetenceGuide): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(competenceGuide);
    return this.http
      .patch<ICompetenceGuide>(`${this.resourceUrl}/${getCompetenceGuideIdentifier(competenceGuide) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByAdmin(id: number): Observable<ICompetenceGuide> {
    return this.http
      .get<ICompetenceGuide>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  find(id: number): Observable<ICompetenceGuide> {
    return this.http
      .get<ICompetenceGuide>(`${environment.API_URL}competences/guides/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }


  queryByAdmin(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICompetenceGuide[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  query(req?: any, competenceIdList: string[] | null = null, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .post<ICompetenceGuide[]>(`${environment.API_URL}competences/guides`, competenceIdList, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }


  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  addCompetenceGuideToCollectionIfMissing(
    competenceGuideCollection: ICompetenceGuide[],
    ...competenceGuidesToCheck: (ICompetenceGuide | null | undefined)[]
  ): ICompetenceGuide[] {
    const competenceGuides: ICompetenceGuide[] = competenceGuidesToCheck.filter(isPresent);
    if (competenceGuides.length > 0) {
      const competenceGuideCollectionIdentifiers = competenceGuideCollection.map(
        competenceGuideItem => getCompetenceGuideIdentifier(competenceGuideItem)!
      );
      const competenceGuidesToAdd = competenceGuides.filter(competenceGuideItem => {
        const competenceGuideIdentifier = getCompetenceGuideIdentifier(competenceGuideItem);
        if (competenceGuideIdentifier == null || competenceGuideCollectionIdentifiers.includes(competenceGuideIdentifier)) {
          return false;
        }
        competenceGuideCollectionIdentifiers.push(competenceGuideIdentifier);
        return true;
      });
      return [...competenceGuidesToAdd, ...competenceGuideCollection];
    }
    return competenceGuideCollection;
  }

  setCompetenceGuides(req: queryType | null = null): void {
    if (req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.competenceGuides$.next(req);
  }

  setCompetenceGuide(project: ICompetenceGuide | null = null): void {
    this.competenceGuide$.next(project);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save = true): queryType {
    const competenceGuides: ICompetenceGuide[] = this.convertCompetenceGuides(res.body);
    const req = {competenceGuides, headers: res.headers};
    if (save) {
      this.setCompetenceGuides(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): ICompetenceGuide {
    const competenceGuide: ICompetenceGuide = this.convertCompetenceGuide(res.body);
    this.setCompetenceGuide(competenceGuide);
    return competenceGuide;
  }

  convertCompetenceGuides(competenceGuides: ICompetenceGuide[] | null): ICompetenceGuide[] {
    if (competenceGuides && competenceGuides?.length > 0) {
      return competenceGuides.map(competenceGuide => {
        return this.convertCompetenceGuide(competenceGuide);
      });
    }
    return [];
  }

  convertCompetenceGuide(competenceGuide: ICompetenceGuide | null): ICompetenceGuide {
    // this.setProjectStep(pStepN);
    return new CompetenceGuide(competenceGuide);
  }

  clearCompetenceGuide(): void {
    this.competenceGuide$.next(null);
  }

  clearCompetenceGuides(): void {
    this.competenceGuides$.next(null);
    this.totalCount$.next(0);
  }

  getByName(name: string, cGuides: ICompetenceGuide[] = []): ICompetenceGuide | null {
    if (!cGuides) {
      cGuides = this.competenceGuides$.getValue()?.competenceGuides || [];
    }
    if (cGuides && name) {
      for (let guide of cGuides) {
        if (guide.name?.toLowerCase() === name.toLowerCase()) {
          return guide;
        }
      }
    }

    return null;
  }

  protected convertDateFromClient(competenceGuide: ICompetenceGuide): ICompetenceGuide {
    return Object.assign({}, competenceGuide, {
      createdDate: competenceGuide.createdDate?.isValid() ? competenceGuide.createdDate.toJSON() : undefined,
      lastModifiedDate: competenceGuide.lastModifiedDate?.isValid() ? competenceGuide.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((competenceGuide: ICompetenceGuide) => {
        competenceGuide.createdDate = competenceGuide.createdDate ? moment(competenceGuide.createdDate) : undefined;
        competenceGuide.lastModifiedDate = competenceGuide.lastModifiedDate ? moment(competenceGuide.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
