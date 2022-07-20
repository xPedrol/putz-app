import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {AccountService} from '../../services/account.service';
import {AuthService} from '../../services/auth.service';
import {NbAuthService} from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class ProjectTabAuthGuard implements CanActivateChild {
  isBrowser;

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    private accountService: AccountService,
    private router: Router,
    private authService: AuthService,
    private nbAuthService: NbAuthService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.nbAuthService.isAuthenticated()
      .pipe(mergeMap((authenticated) => {
          if (authenticated) {
            return this.accountService.getAccount(false).pipe(
              map((account) => {
                if (account!.hasAnyAuthority(route.data.authorities)) {
                  return true;
                } else {
                  this.router.navigate(['/404']);
                  return false;
                }
              }));
          } else {
            this.authService.logout();
            this.router.navigate(['auth/login']);
            return of(false);
          }
        })
      );
  }
}
