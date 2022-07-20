import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {createRequestOption} from '../core/utils/request-util';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

export type queryType = { authorities: string[], headers: HttpHeaders };
export type EntityResponseType = HttpResponse<string>;
export type EntityArrayResponseType = HttpResponse<string[]>;

@Injectable({
  providedIn: 'root'
})

export class AuthorityService {
  authorities$: BehaviorSubject<queryType | null>;
  totalCount$: BehaviorSubject<number>;

  constructor(
    protected http: HttpClient,
  ) {
    this.totalCount$ = new BehaviorSubject<number>(0);
    this.authorities$ = new BehaviorSubject<queryType | null>(null);
  }

  query(req?: any): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<string[]>(`${environment.API_URL}authorities`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res)));
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType): queryType {
    const authorities: string[] = res.body ?? [];
    const req = {authorities, headers: res.headers};
    this.setAuthorities(req);
    return req;
  }


  setAuthorities(req: queryType | null = null): void {
    if (req && req?.headers) {
      this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    }
    this.authorities$.next(req);
  }
}
