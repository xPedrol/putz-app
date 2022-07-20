import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Authority} from '../constants/authority.constants';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {getFaqIdentifier, IFaq, Faq, IFaqStructure} from "../models/faq.model";
import {createRequestOption} from "../core/utils/request-util";
import {isPresent} from "../core/utils/operators";
import * as moment from "moment";

export type EntityResponseType = HttpResponse<IFaq>;
export type EntityArrayResponseType = HttpResponse<IFaq[]>;
export type queryType = { faqs: IFaq[], headers?: HttpHeaders };

@Injectable({providedIn: 'root'})
export class FaqService {

  faqs$: BehaviorSubject<queryType | null>;

  faq$: BehaviorSubject<IFaq | null>;
  totalCount$: BehaviorSubject<number>;

  protected resourceUrl = `${environment.API_URL}admin/faqs`;
  protected resourcePublicUrl = `${environment.API_URL}public/faqs`;

  constructor(
    protected http: HttpClient,
  ) {
    this.faqs$ = new BehaviorSubject<queryType | null>(null);

    this.faq$ = new BehaviorSubject<IFaq | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }


  create(faq: IFaq): Observable<IFaq> {
    const copy = this.convertDateFromClient(faq);
    return this.http
      .post<IFaq>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  update(faq: IFaq): Observable<IFaq> {
    const copy = this.convertDateFromClient(faq);
    return this.http
      .put<IFaq>(`${this.resourceUrl}/${getFaqIdentifier(faq) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  partialUpdate(faq: IFaq): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(faq);
    return this.http
      .patch<IFaq>(`${this.resourceUrl}/${getFaqIdentifier(faq) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<IFaq> {
    return this.http
      .get<IFaq>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  getFaqStructure(): Observable<IFaqStructure[]> {
    return this.http
      .get<any>(`${this.resourcePublicUrl}/structure`).pipe(map(this.handleFaqStructure));
  }

  handleFaqStructure(faqStructure: any): IFaqStructure[] {
    if (faqStructure) {
      return Object.keys(faqStructure).map(key => {
        return {
          faqType: key,
          faqs: faqStructure[key]
        } as IFaqStructure;
      });
    }
    return [];
  }

  getFaqsByType(faqType: string): Observable<IFaq[]> {
    return this.http
      .get<IFaq[]>(`${this.resourcePublicUrl}/${faqType}`);
  }

  getFaqByTypeAndId(faqType: string, id: number): Observable<string> {
    return this.http
      .get<string>(`${this.resourcePublicUrl}/${faqType}/${id}`, {observe: 'response'})
      .pipe(map((res: HttpResponse<string>) => res.body));
  }

  getFaqByTypeAndSlug(faqType: string, slug: string): Observable<string> {
    return this.http
      .get<string>(`${this.resourcePublicUrl}/${faqType}/${slug}.md`, {
        observe: 'response',
        responseType: 'text/markdown' as any
      })
      .pipe(map((res: HttpResponse<string>) => res.body));
  }

  queryByAdmin(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFaq[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  query(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFaq[]>(`${environment.API_URL}faqs`, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  addFaqToCollectionIfMissing(faqCollection: IFaq[], ...faqsToCheck: (IFaq | null | undefined)[]): IFaq[] {
    const faqs: IFaq[] = faqsToCheck.filter(isPresent);
    if (faqs.length > 0) {
      const faqCollectionIdentifiers = faqCollection.map(faqItem => getFaqIdentifier(faqItem)!);
      const faqsToAdd = faqs.filter(faqItem => {
        const faqIdentifier = getFaqIdentifier(faqItem);
        if (faqIdentifier == null || faqCollectionIdentifiers.includes(faqIdentifier)) {
          return false;
        }
        faqCollectionIdentifiers.push(faqIdentifier);
        return true;
      });
      return [...faqsToAdd, ...faqCollection];
    }
    return faqCollection;
  }

  setFaqs(req: queryType | null = null): void {
    if (req && req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.faqs$.next(req);
  }

  setFaq(faq: IFaq | null = null): void {
    this.faq$.next(faq);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const faqs: IFaq[] = this.convertFaqs(res.body);
    const req = {faqs, headers: res.headers};
    this.setFaqs(req);
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): IFaq {
    const faq: IFaq = this.convertFaq(res.body);
    this.setFaq(faq);
    return faq;
  }

  convertFaqs(pSteps: IFaq[] | null): IFaq[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(faq => {
        return this.convertFaq(faq);
      });
    }
    return [];
  }

  convertFaq(pStep: IFaq | null): IFaq {
    const faqN = new Faq(pStep);
    // this.setFaq(pStepN);
    return faqN;
  }

  clearFaq(): void {
    this.faq$.next(null);
  }

  clearFaqs(): void {
    this.faqs$.next(null);
    this.totalCount$.next(0);
  }

  protected convertDateFromClient(faq: IFaq): IFaq {
    return Object.assign({}, faq, {
      createdDate: faq.createdDate?.isValid() ? faq.createdDate.toJSON() : undefined,
      lastModifiedDate: faq.lastModifiedDate?.isValid() ? faq.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((faq: IFaq) => {
        faq.createdDate = faq.createdDate ? moment(faq.createdDate) : undefined;
        faq.lastModifiedDate = faq.lastModifiedDate ? moment(faq.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

}
