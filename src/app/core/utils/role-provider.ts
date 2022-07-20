import {Injectable} from '@angular/core';
import {NbRoleProvider} from '@nebular/security';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountService} from '../../services/account.service';
import {Account, IAccount} from '../../models/account.model';
import {MiddlewareCookieService} from '../../services/middleware-cookie.service';


@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(
    private accountService: AccountService,
    private cookieService: MiddlewareCookieService,
  ) {
  }

  getRole(): Observable<string | string[]> {
    return this.accountService.accountSubject.pipe(map(account => {
      if (account) {
        const modifiedAccount = this.handleAuthority(account);
        const permissions: string[] = [];
        if (modifiedAccount?.isAdmin) {
          permissions.push('admin');
          permissions.push('client');
        }
        if (modifiedAccount?.isAgency) {
          permissions.push('agency');
        }
        if (modifiedAccount?.isFreelancer) {
          permissions.push('freelancer');
        }
        if (modifiedAccount?.isClient) {
          permissions.push('client');
        }
        if (modifiedAccount?.isManager) {
          permissions.push('manager');
        }
        if (modifiedAccount?.isVendor) {
          permissions.push('vendor');
        }
        return permissions;
      }
      return 'guest';
    }));
  }

  handleAuthority(account: IAccount): any {
    const newAccount = new Account(account);
    if (account.isAdmin) {
      let authorities = this.cookieService.getCookie('access-permission');
      if (authorities) {
        authorities = JSON.parse(authorities);
        newAccount.authorities = authorities;
      }
    }
    return newAccount;
  }
}
