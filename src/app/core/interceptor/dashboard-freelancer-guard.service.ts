import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {Authority} from "../../constants/authority.constants";
import {Observable, of} from "rxjs";
import {AccountService} from "../../services/account.service";
import {AuthGuard} from "./auth-guard.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardFreelancerGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authGuard.canActivate(route, state).pipe(mergeMap((authenticated) => {
      if (authenticated) {
        return this.accountService.accountSubject.pipe(map(account => {
          if (account) {
            if (!account.hasOnlyAuthority([Authority.FREELANCER])) {
              return true;
            } else {
              this.router.navigate(['', 'dashboard', 'freelancer']).then();
              return false;
            }
          }
          return false;
        }));
      } else {
        return of(false);
      }
    }));

  }
}
