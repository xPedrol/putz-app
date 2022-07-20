import {Pipe, PipeTransform} from '@angular/core';
import {Authority} from '../../constants/authority.constants';
import {AccountService} from '../../services/account.service';

@Pipe({
  name: 'hasAccess'
})
export class HasAccessPipe implements PipeTransform {
  constructor(
    private accountService: AccountService
  ) {
  }

  transform(authorities: Authority[] = [], excluded: Authority[] = []): boolean {
    return !!(this.accountService.account?.hasAnyAuthority(authorities) && this.accountService.account?.notHasAnyAuthority(excluded));
  }

}
