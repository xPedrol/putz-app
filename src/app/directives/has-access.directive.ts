import {AfterContentInit, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Authority} from '../constants/authority.constants';
import {AccountService} from '../services/account.service';

@Directive({
  selector: '[hasAccess]'
})
export class HasAccessDirective implements AfterContentInit {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private accountService: AccountService
  ) {
  }

  authorities: Authority[] = [];

  @Input() set hasAccess(authorities: Authority[]) {
    this.authorities = authorities;
  }

  excluded: Authority[] = [];

  @Input() set hasAccessExclude(excluded: Authority[]) {
    this.excluded = excluded;

  }

  ngAfterContentInit(): void {
    const isOk = this.accountService.account?.hasAnyAuthority(this.authorities) && this.accountService.account?.notHasAnyAuthority(this.excluded);
    if (isOk) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
