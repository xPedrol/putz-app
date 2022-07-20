import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';
import {AccountService} from '../../services/account.service';
import {AuthService} from '../../services/auth.service';
import {NbAuthService} from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> {
    return this.nbAuthService.isAuthenticated()
      .pipe(mergeMap((authenticated) => {
          if (authenticated) {
            return this.accountService.getAccount(false).pipe(
              map((account) => {
                if (!account?.isAValidAccount()) {
                  this.router.navigateByUrl('/verify-account');
                  return false;
                } else if (account!.hasAnyAuthority(route.data.authorities)) {
                  return true;
                } else {
                  this.router.navigateByUrl('/404');
                  return false;
                }
              }),
              catchError((err) => {
                if (!err || err?.status === 404 || err?.status === 0) {
                  this.router.navigateByUrl('OFFLINESERVER');
                  return of(false);
                } else if (err?.status === 401) {
                  this.authService.logout();
                  this.router.navigateByUrl('/auth/login');
                  return of(false);
                } else {
                  return of(true);
                }
              }));

          } else {
            this.authService.logout();
            this.router.navigate(['auth/login']);
            return of(false);
          }
        })
      );
    // if (this.authService.verifyToken()) {
    //   return this.accountService.getAccount().pipe(
    //     map((account) => {
    //       if (account!.hasAnyAuthority(route.data.authorities)) {
    //         return true;
    //       } else {
    //         this.router.navigateByUrl('/404');
    //         return false;
    //       }
    //     }),
    //     catchError((err) => {
    //       if (!err || err?.status === 404 || err?.status === 0) {
    //         this.router.navigateByUrl('OFFLINESERVER');
    //         return of(false);
    //       }
    //       if (err?.status === 401) {
    //         this.authService.logout();
    //         this.router.navigateByUrl('/auth/login');
    //         return of(false);
    //       }
    //       return of(true);
    //     }));
    // } else {
    //   this.router.navigateByUrl('/auth/login');
    //   return false;
    // }
  }
}
