import {Component, OnDestroy, OnInit} from '@angular/core';
import {PortfolioService} from '../../../services/portfolio.service';
import {IPortfolio} from '../../../models/portfolio.model';
import {IState} from '../../../models/table/state.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AccountService} from '../../../services/account.service';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../constants/dialog-action.constants';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-portfolio-manager-card-list',
  templateUrl: './portfolio-card-list.component.html',
  styleUrls: ['./portfolio-card-list.component.scss']
})
export class PortfolioCardListComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  portfolios: IPortfolio[] | undefined;
  state: IState | undefined;

  constructor(
    public portfolioService: PortfolioService,
    private toastService: NbToastrService,
    private accountService: AccountService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
    this.portfolioService.portfolios$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req && req.portfolios) {
        this.portfolios = req.portfolios;
      }
    });
  }

  deletePortfolio(portfolio: IPortfolio): void {
    const slug = this.accountService.account?.login;
    const portfolioId = portfolio?.id;
    if (portfolioId && slug) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.DELETE,
          msg: `Portfolio: ${portfolio?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.portfolioService.delete(slug, portfolioId).pipe(takeUntil(this.subject$)).subscribe(() => {
            this.toastService.show('', 'Deletado com sucesso', {status: 'success'});
            const portfolios = new Set(this.portfolioService.portfolios$.getValue()?.portfolios || []);
            if (portfolios.delete(portfolio)) {
              this.portfolioService.setPortfolios({portfolios: portfolios.size > 0 ? Array.from(portfolios) : []});
              let size = this.portfolioService.totalCount$.getValue() - 1;
              this.portfolioService.totalCount$.next(size);
            }
          });
        }
      });
    }
  }
  trackPortfoliosByFn(index: number, item: IPortfolio): number {
    return item.id as number;
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
