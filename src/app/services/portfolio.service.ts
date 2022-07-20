import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {getPortfolioIdentifier, IPortfolio, Portfolio} from '../models/portfolio.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import {environment} from '../../environments/environment';


export type queryType = { portfolios: IPortfolio[], headers?: HttpHeaders };
export type EntityResponseType = HttpResponse<IPortfolio>;
export type EntityArrayResponseType = HttpResponse<IPortfolio[]>;

@Injectable({providedIn: 'root'})
export class PortfolioService {
  portfolios$: BehaviorSubject<queryType | null>;

  portfolio$: BehaviorSubject<IPortfolio | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = '';

  constructor(
    protected http: HttpClient,
  ) {
    this.portfolios$ = new BehaviorSubject<queryType | null>(null);
    this.portfolio$ = new BehaviorSubject<IPortfolio | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);

    this.resourceUrl = `${environment.API_URL}admin/portfolios`;
  }

  create(portfolio: IPortfolio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(portfolio);
    return this.http
      .post<IPortfolio>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createByFreelancer(personSlug: string, portfolio: IPortfolio): Observable<IPortfolio> {
    const copy = this.convertDateFromClient(portfolio);
    return this.http
      .post<IPortfolio>(`${environment.API_URL}people/${personSlug}/portfolios`, copy);
  }

  updateByFreelancer(personSlug: string, portfolio: IPortfolio): Observable<IPortfolio> {
    const copy = this.convertDateFromClient(portfolio);
    return this.http
      .put<IPortfolio>(`${environment.API_URL}people/${personSlug}/portfolios/${portfolio.id}`, copy);
  }

  fileUpload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    // @ts-ignore
    return this.http.put<string>(`${environment.API_URL}account/portfolio/upload`, formData, {responseType: 'text'});
  }

  update(portfolio: IPortfolio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(portfolio);
    return this.http
      .put<IPortfolio>(`${this.resourceUrl}/${getPortfolioIdentifier(portfolio) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(portfolio: IPortfolio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(portfolio);
    return this.http
      .patch<IPortfolio>(`${this.resourceUrl}/${getPortfolioIdentifier(portfolio) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPortfolio>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByPerson(personSlug: string, id: number): Observable<IPortfolio> {
    return this.http
      .get<IPortfolio>(`${environment.API_URL}people/${personSlug}/portfolios/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  queryByPeopleSlug(personSlug: string | number, req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPortfolio[]>(`${environment.API_URL}people/${personSlug}/portfolios`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  query(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPortfolio[]>(`${environment.API_URL}portfolios`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  queryByAdmin(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPortfolio[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  deleteByAdmin(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  delete(login: string, id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${environment.API_URL}people/${login}/portfolios/${id}`, {observe: 'response'});
  }

  approvePortfolio(id: number, portfolio: any): Observable<IPortfolio> {
    return this.http.patch<IPortfolio>(`${environment.API_URL}portfolios/${id}`, portfolio,{headers:{'Content-Type':'application/merge-patch+json'}});
  }

  addPortfolioToCollectionIfMissing(
    portfolioCollection: IPortfolio[],
    ...portfoliosToCheck: (IPortfolio | null | undefined)[]
  ): IPortfolio[] {
    const portfolios: IPortfolio[] = portfoliosToCheck.filter(isPresent);
    if (portfolios.length > 0) {
      const portfolioCollectionIdentifiers = portfolioCollection.map(portfolioItem => getPortfolioIdentifier(portfolioItem)!);
      const portfoliosToAdd = portfolios.filter(portfolioItem => {
        const portfolioIdentifier = getPortfolioIdentifier(portfolioItem);
        if (portfolioIdentifier == null || portfolioCollectionIdentifiers.includes(portfolioIdentifier)) {
          return false;
        }
        portfolioCollectionIdentifiers.push(portfolioIdentifier);
        return true;
      });
      return [...portfoliosToAdd, ...portfolioCollection];
    }
    return portfolioCollection;
  }

  setPortfolios(res: queryType | null = null): void {
    if (res?.headers) {
      this.totalCount$.next(Number(res.headers.get('X-Total-Count')));
    }
    this.portfolios$.next(res);
  }

  setPortfolio(project: IPortfolio | null = null): void {
    this.portfolio$.next(project);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const portfolios: IPortfolio[] = this.convertPortfolios(res.body);
    const req = {portfolios, headers: res.headers};
    this.setPortfolios(req);
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): IPortfolio {
    const portfolio: IPortfolio = this.convertPortfolio(res.body);
    this.setPortfolio(portfolio);
    return portfolio;
  }

  convertPortfolios(pSteps: IPortfolio[] | null): IPortfolio[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(projectStep => {
        return this.convertPortfolio(projectStep);
      });
    }
    return [];
  }

  convertPortfolio(portfolio: IPortfolio | null): IPortfolio {
    // this.setProjectStep(pStepN);
    return new Portfolio(portfolio);
  }

  clearPortfolio(): void {
    this.portfolio$.next(null);
  }

  clearPortfolios(): void {
    this.portfolios$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(portfolio: IPortfolio): IPortfolio {
    return Object.assign({}, portfolio, {
      createdDate: portfolio.createdDate?.isValid() ? portfolio.createdDate.toJSON() : undefined,
      lastModifiedDate: portfolio.lastModifiedDate?.isValid() ? portfolio.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((portfolio: IPortfolio) => {
        portfolio.createdDate = portfolio.createdDate ? moment(portfolio.createdDate) : undefined;
        portfolio.lastModifiedDate = portfolio.lastModifiedDate ? moment(portfolio.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
