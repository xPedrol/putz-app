import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {IState} from '../../../models/table/state.model';
import {ITableColumn} from '../../../models/table.model';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {SortEvent} from '../../../directives/sortable.directive';
import {IPortfolio} from '../../../models/portfolio.model';
import {PortfolioService} from '../../../services/portfolio.service';
import {AccountService} from '../../../services/account.service';
import {ISort, Sort} from '../../../models/table/sort.model';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {DialogAction} from '../../../constants/dialog-action.constants';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {PortfolioRequestStatusEnum} from '../../../models/enums/portfolio-request-status.model';

@Component({
  selector: 'app-portfolio-manager-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.scss']
})
export class PortfolioTableComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  @Output() stateChange: EventEmitter<ISort> = new EventEmitter<ISort>();
  sort: ISort | undefined;
  portfolios: IPortfolio[] | undefined;
  portfolioRequestStatusEnum = PortfolioRequestStatusEnum;
  portfoliosColumn: ITableColumn[] = [
    {
      title: 'Nome',
      name: 'name',
      class: 'text-md-start'
    },
    {
      title: 'Competência',
      name: 'competenceName',
      class: 'text-md-start'
    },
    {
      title: 'Arquivo',
      name: 'file',
      class: 'text-md-start'
    },
    {
      title: 'Status',
      name: 'isVerified',
      class: 'text-md-start'
    },
    {
      title: 'Nível',
      name: 'level',
      class: 'text-md-start'
    },
    {
      title: '',
      name: 'actions',
      class: 'text-md-end'
    }
  ];
  state: IState | undefined;

  constructor(
    public portfolioService: PortfolioService,
    private toastService: NbToastrService,
    private accountService: AccountService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  ngOnInit(): void {
    this.portfolioService.portfolios$.pipe(takeUntil(this.subject$)).subscribe(req => {
      if (req && req?.portfolios) {
        this.portfolios = req.portfolios;
      }
    });
    this.accountService.accountSubject.subscribe(account => {
      if (account?.isAdmin) {
        this.portfoliosColumn.unshift({
          title: 'ID',
          name: 'id',
          class: 'text-md-start'
        });
        this.portfoliosColumn.splice(2, 0, {
          title: 'Freelancer',
          name: 'freelancer',
          class: 'text-md-start'
        });
      } else if (account?.isManager) {
        this.portfoliosColumn.splice(1, 0, {
          title: 'Freelancer',
          name: 'freelancer',
          class: 'text-md-start'
        });
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
          this.portfolioService.delete(slug, portfolioId).subscribe(() => {
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

  verifyPortfolio(portfolio: IPortfolio): void {
    const slug = this.accountService.account?.login;
    const patchPortfolio = {
      id: portfolio?.id,
      isVerified: true
    };
    const portfolioId = portfolio?.id;
    if (portfolioId && slug) {
      this.dialogService.open(ConfirmDialogComponent, {
        context: {
          action: DialogAction.UPDATE,
          msg: `Portfolio: ${portfolio?.name}`
        }
      }).onClose.pipe(takeUntil(this.subject$)).subscribe(proceed => {
        if (proceed) {
          this.portfolioService.approvePortfolio(portfolioId, patchPortfolio).subscribe((newPortfolio) => {
            this.toastService.show('', 'Aprovado com sucesso', {status: 'success'});
            const index = this.portfolios?.indexOf(portfolio);
            if (typeof index === 'number' && index >= 0) {
              const portfolios = this.portfolioService.portfolios$.getValue()?.portfolios ?? [];
              portfolios[index] = newPortfolio;
              this.portfolioService.setPortfolios({portfolios});
            }
          });
        }
      });
    }
  }

  trackPortfoliosByFn(index: number, item: IPortfolio): number {
    return item.id as number;
  }

  onSort(sortEvent: SortEvent) {
    this.sort = new Sort(sortEvent);
    this.stateChange.emit(this.sort);
  }


}
