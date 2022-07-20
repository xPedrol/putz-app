import {Component, OnDestroy, OnInit} from '@angular/core';
import {PortfolioService} from '../../../services/portfolio.service';
import {AccountService} from '../../../services/account.service';
import {NbDialogService} from '@nebular/theme';
import {PortfolioInfoDialogComponent} from '../portfolio-info-dialog/portfolio-info-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {IPortfolio} from '../../../models/portfolio.model';
import {TableBase} from '../../../models/table/table-base.model';
import {State} from '../../../models/table/state.model';
import {combineLatest, Subject} from 'rxjs';
import {HeadService} from '../../../services/head.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-manager-dashboard',
  templateUrl: './portfolio-dashboard.component.html',
  styleUrls: [
    './portfolio-dashboard.component.scss'
  ]
})
export class PortfolioDashboardComponent extends TableBase implements OnInit, OnDestroy {
  personLogin: string | undefined;
  tableView = true;
  portfolios: IPortfolio[] | undefined;
  subject$: Subject<any>;
  isLoading = true;

  constructor(
    public portfolioService: PortfolioService,
    private accountService: AccountService,
    private dialogService: NbDialogService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private headService: HeadService,
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.createState();
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.queryParams
    ]).pipe(takeUntil(this.subject$)).subscribe(([params, queryParams]) => {
      if (params?.login) {
        this.personLogin = params?.login;
        this.headService.setTitle('Portfólios');
      } else {
        this.headService.setTitle('Meu Portfólio');
      }
      this.createState(queryParams);
      this.getPortfolios(this.state?.getQuery);
    });
    this.portfolioService.totalCount$.pipe(takeUntil(this.subject$)).subscribe(total => {
      this.listTotalSize = total ?? 0;
    });
    this.portfolioService.portfolios$.pipe(takeUntil(this.subject$)).subscribe((res) => {
      this.portfolios = res?.portfolios;
    });
  }

  getPortfolios(query: any = null): void {
    this.isLoading = true;
    if (!query) {
      query = this.state?.getQuery;
    }
    query.page--;
    const login = this.personLogin ?? this.accountService.account?.login;
    if (login) {
      this.portfolioService.queryByPeopleSlug(login, query).pipe(takeUntil(this.subject$)).subscribe().add(() => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.portfolioService.clearPortfolios();
    this.subject$.next(null);
    this.subject$.complete();
  }

  openPortfolioInfoDialog(): void {
    this.dialogService.open(PortfolioInfoDialogComponent);
  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
    } else {
      this.state = new State();
    }
  }
}
