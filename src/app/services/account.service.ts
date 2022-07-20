import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {Account, IAccount} from '../models/account.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account$: Observable<IAccount | null>;
  accountSubject: BehaviorSubject<IAccount | null>;
  account: IAccount | null;

  constructor(
    private http: HttpClient
  ) {
    this.account = null;
    this.account$ = EMPTY;
    this.accountSubject = new BehaviorSubject<IAccount | null>(null);
  }

  getAccount(force?: boolean): Observable<IAccount | null> {
    if (force || this.account$ === EMPTY) {
      this.account$ = this.getAccountFromApi().pipe(map((account) => {
        this.account = new Account(account);
        this.accountSubject.next(this.account);
        return this.account;
      }), shareReplay(1));
    }
    return this.account$;
  }

  setAccount(account: IAccount): void {
    this.accountSubject.next(account);
    this.account$ = of(account);
    this.account = account;
  }

  getAccountFromApi(): Observable<IAccount> {
    return this.http.get<IAccount>(`${environment.API_URL}account`);
  }

  changePassword(passwords: any): Observable<any> {
    const url = `account/change-password`;
    return this.http.post<boolean>(`${environment.API_URL}${url}`, passwords);
  }

  clearAccount(): void {
    this.account = null;
    this.accountSubject.next(this.account);
    this.account$ = EMPTY;
  }

}
