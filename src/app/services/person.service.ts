import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {getPersonIdentifier, IPerson, Person} from '../models/person.model';
import {createRequestOption} from '../core/utils/request-util';
import {isPresent} from '../core/utils/operators';
import {DATE_FORMAT} from '../config/input.constants';
import {environment} from '../../environments/environment';

export type queryType = { people: IPerson[], headers: HttpHeaders };
export type EntityResponseType = HttpResponse<IPerson>;
export type EntityArrayResponseType = HttpResponse<IPerson[]>;

@Injectable({providedIn: 'root'})
export class PersonService {
  people$: BehaviorSubject<queryType | null>;

  person$: BehaviorSubject<IPerson | null>;
  totalCount$: BehaviorSubject<number>;
  protected resourceUrl = `${environment.API_URL}admin/people`;

  constructor(
    protected http: HttpClient,
  ) {
    this.people$ = new BehaviorSubject<queryType | null>(null);

    this.person$ = new BehaviorSubject<IPerson | null>(null);
    this.totalCount$ = new BehaviorSubject<number>(0);
  }

  createByAdmin(person: IPerson): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(person);
    return this.http
      .post<IPerson>(this.resourceUrl, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  updateByAdmin(person: IPerson): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(person);
    return this.http
      .put<IPerson>(`${this.resourceUrl}/${getPersonIdentifier(person) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(person: IPerson): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(person);
    return this.http
      .patch<IPerson>(`${this.resourceUrl}/${getPersonIdentifier(person) as number}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByAdmin(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPerson>(`${this.resourceUrl}/${id}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(login: string): Observable<IPerson> {
    return this.http
      .get<IPerson>(`${environment.API_URL}people/${login}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  queryByAdmin(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPerson[]>(this.resourceUrl, {params: options, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(personRole: string, req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPerson[]>(`${environment.API_URL}people/type/${personRole}`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  queryWithoutPagination(personRole: string, req?: any, save = true): Observable<queryType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPerson[]>(`${environment.API_URL}people/type/${personRole}/list`, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertEntityArrayResponseType(res, save)));
  }

  deleteByAdmin(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  delete(login: string): Observable<{}> {
    return this.http.delete(`${environment.API_URL}people/${login}`);
  }

  create(product: IPerson): Observable<IPerson> {
    const copy = this.convertDateFromClient(product);
    return this.http
      .post<IPerson>(`${environment.API_URL}people`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  update(person: IPerson, slug: string): Observable<IPerson> {
    const copy = this.convertDateFromClient(person);
    return this.http
      .put<IPerson>(`${environment.API_URL}people/${slug}`, copy, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  getPersonByAccount(): Observable<IPerson> {
    const url = 'account/profile/';
    return this.http.get<IPerson>(`${environment.API_URL}${url}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  getPerson(slug: string): Observable<IPerson> {
    return this.http.get<IPerson>(`${environment.API_URL}people/${slug}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertEntityResponseType(res)));
  }

  personImageUpload(image: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);
    return this.http.put<boolean>(`${environment.API_URL}account/profile/image`, formData);
    // .pipe(map(() => { return true; }));
  }

  personImageUploadBySlug(image: File, slug: string): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);
    return this.http.put<boolean>(`${environment.API_URL}people/${slug}/image`, formData);
    // .pipe(map(() => { return true; }));
  }


  savePerson(profile: any) {
    const url = `account/profile`;
    return this.http.put<boolean>(`${environment.API_URL}${url}`, profile);
  }

  addPersonToCollectionIfMissing(personCollection: IPerson[], ...peopleToCheck: (IPerson | null | undefined)[]): IPerson[] {
    const people: IPerson[] = peopleToCheck.filter(isPresent);
    if (people.length > 0) {
      const personCollectionIdentifiers = personCollection.map(personItem => getPersonIdentifier(personItem)!);
      const peopleToAdd = people.filter(personItem => {
        const personIdentifier = getPersonIdentifier(personItem);
        if (personIdentifier == null || personCollectionIdentifiers.includes(personIdentifier)) {
          return false;
        }
        personCollectionIdentifiers.push(personIdentifier);
        return true;
      });
      return [...peopleToAdd, ...personCollection];
    }
    return personCollection;
  }

  setPersons(req: queryType | null = null): void {
    this.totalCount$.next(Number(req.headers.get('X-Total-Count')));
    this.people$.next(req);
  }

  setPerson(person: IPerson | null = null): void {
    this.person$.next(person);
  }

  convertEntityArrayResponseType(res: EntityArrayResponseType, save = true): queryType {
    const people: IPerson[] = this.convertPersons(res.body);
    const req = {people, headers: res.headers};
    if (save) {
      this.setPersons(req);
    }
    return req;
  }

  convertEntityResponseType(res: EntityResponseType): IPerson {
    const person: IPerson = this.convertPerson(res.body);
    this.setPerson(person);
    return person;
  }

  convertPersons(pSteps: IPerson[] | null): IPerson[] {
    if (pSteps && pSteps?.length > 0) {
      return pSteps.map(person => {
        return this.convertPerson(person);
      });
    }
    return [];
  }

  convertPerson(person: IPerson | null): IPerson {
    const personN = new Person(person);
    // this.setPerson(pStepN);
    return personN;
  }

  clearPerson(): void {
    this.person$.next(null);
  }

  clearPersons(): void {
    this.people$.next(null);
    this.totalCount$.next(0);
  }

  findPersonById(personId: number, people?: IPerson[]) {
    people = people ?? this.people$.getValue()?.people;
    if (people && people?.length > 0) {
      for (let person of people) {
        if (person.id === personId) {
          return person;
        }
      }
    }
    return null;
  }

  protected convertDateFromClient(person: IPerson): IPerson {
    return Object.assign({}, person, {
      birthday: person.birthday?.isValid() ? person.birthday.format(DATE_FORMAT) : undefined,
      lastaccess: person.lastaccess?.isValid() ? person.lastaccess.toJSON() : undefined,
      createdDate: person.createdDate?.isValid() ? person.createdDate.toJSON() : undefined,
      lastModifiedDate: person.lastModifiedDate?.isValid() ? person.lastModifiedDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthday = res.body.birthday ? moment(res.body.birthday) : undefined;
      res.body.lastaccess = res.body.lastaccess ? moment(res.body.lastaccess) : undefined;
      res.body.createdDate = res.body.createdDate ? moment(res.body.createdDate) : undefined;
      res.body.lastModifiedDate = res.body.lastModifiedDate ? moment(res.body.lastModifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((person: IPerson) => {
        person.birthday = person.birthday ? moment(person.birthday) : undefined;
        person.lastaccess = person.lastaccess ? moment(person.lastaccess) : undefined;
        person.createdDate = person.createdDate ? moment(person.createdDate) : undefined;
        person.lastModifiedDate = person.lastModifiedDate ? moment(person.lastModifiedDate) : undefined;
      });
    }
    return res;
  }

}
