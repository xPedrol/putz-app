import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {TableBase} from '../../../../models/table/table-base.model';
import {IPortfolio} from '../../../../models/portfolio.model';
import {combineLatest, Subject} from 'rxjs';
import {PortfolioService} from '../../../../services/portfolio.service';
import {AccountService} from '../../../../services/account.service';
import {NbDialogService} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {HeadService} from '../../../../services/head.service';
import {takeUntil} from 'rxjs/operators';
import {State} from '../../../../models/table/state.model';
import {PortfolioFilterDialogComponent} from "../../portfolio-filter-dialog/portfolio-filter-dialog.component";

@Component({
  selector: 'app-portfolio-manager-manager',
  templateUrl: './portfolio-manager.component.html',
  styleUrls: ['./portfolio-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioManagerComponent extends TableBase implements OnInit, OnDestroy {
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
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject<any>();
    this.headService.setTitle('Portfolios');
  }

  ngOnInit(): void {
    this.createState();
    combineLatest([
      this.activatedRoute.queryParams
    ]).pipe(takeUntil(this.subject$)).subscribe(([queryParams]) => {
      this.createState(queryParams);
      this.getPortfolios(this.state.getQuery);
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
      query = this.state.getQuery;
    }
    query.page--;
    const login = this.accountService.account.login;
    if (login) {
      this.portfolioService.query(query).pipe(takeUntil(this.subject$)).subscribe().add(() => {
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
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


  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      this.state.setSearchTerm(params);
    } else {
      this.state = new State();
    }
  }

  openFilterDialog(): void {
    const stateForFilter: any = {searchTerm: this.state.searchTerm};
    this.dialogService.open(PortfolioFilterDialogComponent, {context: {state: stateForFilter}}).onClose.subscribe(res => {
      if (res) {
        this.state.setSearchTerm(res);
        this.handleNavigation(this.state.getQuery);
      }
    });
  }

}
