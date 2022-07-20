import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AccountService} from '../../../../services/account.service';
import {IAccount} from '../../../../models/account.model';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss','../../../themes/nebular-overrides.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  account: IAccount | undefined;
  destroy$: Subject<any>;
  loadingAccount = true;

  constructor(
    public accountService: AccountService,
  ) {
    this.destroy$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.accountService.getAccount(false).pipe(takeUntil(this.destroy$)).subscribe(account => {
      this.account = account ?? undefined;
    }).add(() => this.loadingAccount = false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
