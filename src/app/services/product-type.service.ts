import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {createRequestOption} from "../core/utils/request-util";
import * as moment from "moment";
import {getProductTypeIdentifier, IProductType, ProductType} from "../models/product-type.model";

export type EntityResponseType = HttpResponse<IProductType>;
export type EntityArrayResponseType = HttpResponse<IProductType[]>;
@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  productTypes$: BehaviorSubject<EntityArrayResponseType | null>;

  productType$: BehaviorSubject<IProductType | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/products/types`;

  constructor(
    protected http: HttpClient,
  ) {
    this.productTypes$ = new BehaviorSubject<EntityArrayResponseType | null>(null);

    this.productType$ = new BehaviorSubject<IProductType | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  create(productType: IProductType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productType);
    return this.http
      .post<IProductType>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productType: IProductType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productType);
    return this.http
      .put<IProductType>(`${this.resourceUrl}/${getProductTypeIdentifier(productType) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(productType: IProductType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productType);
    return this.http
      .patch<IProductType>(`${this.resourceUrl}/${getProductTypeIdentifier(productType) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductType>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  queryByAdmin(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductType[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertToProject(res)));
  }

  query(req?: any): Observable<IProductType[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductType[]>(`${environment.API_URL}productTypes`, {params: options});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }


  protected convertDateFromClient(productType: IProductType): IProductType {
    return Object.assign({}, productType, {
      createdDate: productType.createdDate?.isValid() ? productType.createdDate.toJSON() : undefined,
      lastModifiedDate: productType.lastModifiedDate?.isValid() ? productType.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((productType: IProductType) => {
        productType = new ProductType(productType);
      });
    }
    this.productTypes$.next(res);
    this.totalCount$.next(Number(res.headers.get('X-Total-Count')));
    return res;
  }

  clearProductType(): void {
    this.productType$.next(null);
  }

  clearProductTypes(): void {
    this.productTypes$.next(null);
    this.totalCount$.next(0);
  }
}
