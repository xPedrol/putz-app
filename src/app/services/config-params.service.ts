import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getConfigParamsIdentifier, IConfigParams} from '../models/config-params.model';
import {createRequestOption} from '../core/utils/request-util';
import * as moment from 'moment';
import {configParamsType} from '../constants/configParams.constants';
import {isPresent} from '../core/utils/operators';
import {environment} from '../../environments/environment';

export type EntityResponseType = HttpResponse<IConfigParams>;
export type EntityArrayResponseType = HttpResponse<IConfigParams[]>;

@Injectable({providedIn: 'root'})
export class ConfigParamsService {
  protected resourceUrl = `${environment.API_URL}admin/configparams`;

  constructor(
    protected http: HttpClient
  ) {
  }

  create(configParams: IConfigParams): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(configParams);
    return this.http
      .post<IConfigParams>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(configParams: IConfigParams): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(configParams);
    return this.http
      .put<IConfigParams>(`${this.resourceUrl}/${getConfigParamsIdentifier(configParams) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(configParams: IConfigParams): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(configParams);
    return this.http
      .patch<IConfigParams>(`${this.resourceUrl}/${getConfigParamsIdentifier(configParams) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConfigParams>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConfigParams[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  getConfigParamsFromType(type: configParamsType): Observable<EntityArrayResponseType> {
    return this.http
      .get<IConfigParams[]>(`${environment.API_URL}configparams/type/${type}`, {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  findOnArray(configParam: string | undefined, configParams: IConfigParams[] | undefined): string | undefined {
    if (configParams) {
      for (let configParamA of configParams) {
        if (configParamA.slug === configParam) {
          return configParam;
        }
      }
    }
    return undefined;
  }

  addConfigParamsToCollectionIfMissing(
    configParamsCollection: IConfigParams[],
    ...configParamsToCheck: (IConfigParams | null | undefined)[]
  ): IConfigParams[] {
    const configParams: IConfigParams[] = configParamsToCheck.filter(isPresent);
    if (configParams.length > 0) {
      const configParamsCollectionIdentifiers = configParamsCollection.map(
        configParamsItem => getConfigParamsIdentifier(configParamsItem)!
      );
      const configParamsToAdd = configParams.filter(configParamsItem => {
        const configParamsIdentifier = getConfigParamsIdentifier(configParamsItem);
        if (configParamsIdentifier == null || configParamsCollectionIdentifiers.includes(configParamsIdentifier)) {
          return false;
        }
        configParamsCollectionIdentifiers.push(configParamsIdentifier);
        return true;
      });
      return [...configParamsToAdd, ...configParamsCollection];
    }
    return configParamsCollection;
  }

  protected convertDateFromClient(configParams: IConfigParams): IConfigParams {
    return Object.assign({}, configParams, {
      createdDate: configParams.createdDate?.isValid() ? configParams.createdDate.toJSON() : undefined,
      lastModifiedDate: configParams.lastModifiedDate?.isValid() ? configParams.lastModifiedDate.toJSON() : undefined,
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
      res.body.forEach((configParams: IConfigParams) => {
        configParams.createdDate = configParams.createdDate ? moment(configParams.createdDate) : undefined;
        configParams.lastModifiedDate = configParams.lastModifiedDate ? moment(configParams.lastModifiedDate) : undefined;
      });
    }
    return res;
  }
}
