import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IUser, User} from '../models/user.model';
import {map} from 'rxjs/operators';

export type queryType = { people: IUser[], headers: HttpHeaders };
export type EntityResponseType = HttpResponse<IUser>;
export type EntityArrayResponseType = HttpResponse<IUser[]>;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<any | null>;
  totalCount$: BehaviorSubject<number>;

  constructor(
    private http: HttpClient,
  ) {
    this.user$ = new BehaviorSubject<any | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  // create(product-admin: IUser): Observable<IUser> {
  //   const copy = this.convertDateFromClient(product-admin);
  //   return this.http
  //     .post<IUser>(`${environment.API_URL}people`, copy, {observe: 'response'})
  //     .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  // }
  //
  update(person: IUser): Observable<IUser> {
    return this.http
      .put<IUser>(`${environment.API_URL}admin/users`, person, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  findByAdmin(login: string): Observable<IUser> {
    return this.http
      .get<IUser>(`${environment.API_URL}admin/users/${login}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  find(login: string): Observable<IUser> {
    return this.http
      .get<IUser>(`${environment.API_URL}users/${login}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  changePasswordByAdmin(login: string, passwords: any): Observable<any> {
    const url = `admin/users/${login}/new-password`;
    return this.http.post<boolean>(`${environment.API_URL}${url}`, passwords);
  }


  setPersons(req: queryType | null = null): void {
    this.user$.next(req);
  }

  setPerson(person: IUser | null = null): void {
    this.user$.next(person);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save = true): queryType {
    const people: IUser[] = this.convertPersons(res.body);
    const req = {people, headers: res.headers};
    if (save) {
      this.setPersons(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): IUser {
    const person: IUser = this.convertPerson(res.body);
    this.setPerson(person);
    return person;
  }

  convertPersons(pSteps: IUser[] | null): IUser[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(person => {
        return this.convertPerson(person);
      });
    }
    return [];
  }

  convertPerson(person: IUser | null): IUser {
    return new User(person);
  }

  clearPerson(): void {
    this.user$.next(null);
  }

  clearPersons(): void {
    this.user$.next(null);
    this.totalCount$.next(0);
  }
}
