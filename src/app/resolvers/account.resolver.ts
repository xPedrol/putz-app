import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AccountService} from '../services/account.service';
import {IAccount} from '../models/account.model';
import {catchError} from 'rxjs/operators';
import {MiddlewareCookieService} from '../services/middleware-cookie.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<IAccount> {
  constructor(
    private accountService: AccountService,
    private cookieService: MiddlewareCookieService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAccount> {
    if (this.cookieService.getCookie(environment.AUTH_TOKEN)) {
      return this.accountService.getAccount().pipe(catchError(() => {
        return of(null);
      }));
    } else {
      return of(null);
    }
  }
}
