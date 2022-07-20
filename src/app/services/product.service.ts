import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getProductIdentifier, IProduct, Product} from '../models/product.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import * as moment from 'moment';
import {environment} from '../../environments/environment';

export type EntityResponseType = HttpResponse<IProduct>;
export type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({providedIn: 'root'})
export class ProductService {
  products$: BehaviorSubject<EntityArrayResponseType | null>;

  product$: BehaviorSubject<IProduct | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/products`;

  constructor(
    protected http: HttpClient,
  ) {
    this.products$ = new BehaviorSubject<EntityArrayResponseType | null>(null);

    this.product$ = new BehaviorSubject<IProduct | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  create(product: IProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(product);
    return this.http
      .post<IProduct>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(product: IProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(product);
    return this.http
      .put<IProduct>(`${this.resourceUrl}/${getProductIdentifier(product) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(product: IProduct): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(product);
    return this.http
      .patch<IProduct>(`${this.resourceUrl}/${getProductIdentifier(product) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProduct>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  queryByAdmin(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduct[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertToProject(res)));
  }

  query(req?: any): Observable<IProduct[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduct[]>(`${environment.API_URL}products`, {params: options});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  addProductToCollectionIfMissing(productCollection: IProduct[], ...productsToCheck: (IProduct | null | undefined)[]): IProduct[] {
    const products: IProduct[] = productsToCheck.filter(isPresent);
    if (products.length > 0) {
      const productCollectionIdentifiers = productCollection.map(productItem => getProductIdentifier(productItem)!);
      const productsToAdd = products.filter(productItem => {
        const productIdentifier = getProductIdentifier(productItem);
        if (productIdentifier == null || productCollectionIdentifiers.includes(productIdentifier)) {
          return false;
        }
        productCollectionIdentifiers.push(productIdentifier);
        return true;
      });
      return [...productsToAdd, ...productCollection];
    }
    return productCollection;
  }

  protected convertDateFromClient(product: IProduct): IProduct {
    return Object.assign({}, product, {
      createdDate: product.createdDate?.isValid() ? product.createdDate.toJSON() : undefined,
      lastModifiedDate: product.lastModifiedDate?.isValid() ? product.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertToProject(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((product: IProduct) => {
        product = new Product(product);
      });
    }
    this.products$.next(res);
    this.totalCount$.next(Number(res.headers.get('X-Total-Count')));
    return res;
  }

  clearProduct(): void {
    this.product$.next(null);
  }

  clearProducts(): void {
    this.products$.next(null);
    this.totalCount$.next(0);
  }
}
