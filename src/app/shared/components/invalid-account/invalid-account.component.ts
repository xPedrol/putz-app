import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAccount} from '../../../models/account.model';
import {Subject, takeUntil} from 'rxjs';
import {AccountService} from '../../../services/account.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-invalid-account',
  templateUrl: './invalid-account.component.html',
  styleUrls: ['./invalid-account.component.scss']
})
export class InvalidAccountComponent implements OnInit, OnDestroy {
  account: IAccount | undefined;
  destroy$: Subject<any>;
  loadingAccount = true;
  invalidAccount = false;

  constructor(
    public accountService: AccountService,
    private authService: AuthService
  ) {
    this.destroy$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.accountService.getAccount(false).pipe(takeUntil(this.destroy$)).subscribe(account => {
      this.account = account ?? undefined;
      this.invalidAccount = !this.account?.isAValidAccount() ?? false;
    }).add(() => this.loadingAccount = false);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  handleInvalidAccount(): void {
    this.authService.logout();
  }
}
