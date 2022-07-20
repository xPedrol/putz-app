import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AccountService} from '../../services/account.service';
import {MiddlewareCookieService} from '../../services/middleware-cookie.service';
import {AuthService} from '../../services/auth.service';
import {NbAuthService} from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private cookieService: MiddlewareCookieService,
    private authService: AuthService,
    private nbAuthService: NbAuthService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.nbAuthService.isAuthenticated()
      .pipe(map((authenticated) => {
          if (authenticated) {
            this.router.navigateByUrl(`/dashboard`);
            return false;
          } else {
            return true;
          }
        }),
        catchError(() => {
          return of(true);
        }));
  }
}
