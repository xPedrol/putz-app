import {ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {combineLatest, Subject} from "rxjs";
import {IPortfolio} from "../../../../models/portfolio.model";
import {IProjectItemRequest} from "../../../../models/project-item-request.model";
import {ProjectStatus} from "../../../../models/enums/project-status.model";
import {FormControl} from "@angular/forms";
import {IAccount} from "../../../../models/account.model";
import {ILastProjectDates} from "../../../../models/last-projects-dates.model";
import {ProjectService} from "../../../../services/project.service";
import {ProjectGraphService} from "../../../../services/project-graph.service";
import {PortfolioService} from "../../../../services/portfolio.service";
import {HeadService} from "../../../../services/head.service";
import {AccountService} from "../../../../services/account.service";
import {NbDialogService} from "@nebular/theme";
import {MiddlewareCookieService} from "../../../../services/middleware-cookie.service";
import {ProjectItemRequestService} from "../../../../services/project-item-request.service";
import {isPlatformBrowser} from "@angular/common";
import * as moment from "moment/moment";
import {environment} from "../../../../../environments/environment";
import {Authority} from "../../../../constants/authority.constants";
import {takeUntil} from "rxjs/operators";
import {
  DashboardGuidedTourDialogComponent
} from "../../dashboard-shared/dashboard-guided-tour-dialog/dashboard-guided-tour-dialog.component";
import {ProjectItemService} from "../../../../services/project-item.service";
import {IProjectItem} from "../../../../models/project-item.model";

interface IProjectCount {
  conception?: number;
  execution?: number;
}

@Component({
  selector: 'app-dashboard-freelancer',
  templateUrl: './dashboard-freelancer.component.html',
  styleUrls: ['./dashboard-freelancer.component.scss']
})
export class DashboardFreelancerComponent implements OnInit {

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  subject$: Subject<any>;


  openedProjectItems: IProjectItemRequest[];
  loadingOpenedProjectItems = false;

  finishedProjectItems: IProjectItemRequest[];
  loadingFinishedProjectItems = false;

  opportunities: IProjectItemRequest[] | undefined;
  loadingOpportunities = false;

  openedOpportunities: IProjectItemRequest[] | undefined;
  loadingOpenedOpportunities = false;

  isBrowser: boolean;
  projectCount: IProjectCount | undefined;
  currentYear: number;
  selectEchart: FormControl;
  inputEchart: FormControl;
  isFreelancer = false;
  account: IAccount | undefined;
  showAllCookieKey = 'dashboard-show-all';
  lastProjectDates: ILastProjectDates;

  constructor(
    private projectService: ProjectService,
    private projectGraphService: ProjectGraphService,
    private portfolioService: PortfolioService,
    private headService: HeadService,
    private changeDetectorRef: ChangeDetectorRef,
    private accountService: AccountService,
    private dialogService: NbDialogService,
    private cookieService: MiddlewareCookieService,
    private projectItemRequestService: ProjectItemRequestService,
    private projectItemService: ProjectItemService,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentYear = moment().year();
    this.projectCount = {};
    this.subject$ = new Subject<any>();
    this.selectEchart = new FormControl(this.currentYear);
    this.inputEchart = new FormControl(this.currentYear);
    this.headService.setTitle(`Painel de controle`);
  }

  ngOnInit(): void {
    this.getLastProjectDates();
    this.getOpenedOpportunities();
    this.accountService.accountSubject.pipe().subscribe((account) => {
      if (account) {
        const showTourCookie = this.cookieService.getCookie(environment.DASHBOARD_TOUR_KEY);
        this.isFreelancer = account.notHasAnyAuthority([Authority.MANAGER, Authority.ADMIN]) && account.hasAnyAuthority([Authority.FREELANCER]);
        const showTour = (showTourCookie ? !Boolean(showTourCookie) : true) && this.isFreelancer;
        if (showTour) {
          this.buildTour();
        }
        this.account = account;
        this.getOpenedProjectItems();
        this.getFinishedProjectItems();
        this.getOpportunities();
        this.getProjectCountByStatus();
      }
    });
  }

  getLastProjectDates(): void {
    this.projectGraphService.getLastProjectDates().pipe(takeUntil(this.subject$)).subscribe(lastDates => {
      this.lastProjectDates = lastDates;
    }).add(() => this.changeDetectorRef.detectChanges());
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }


  getOpportunities(): void {
    this.loadingOpportunities = true;
    this.projectItemRequestService.getByAccount({
      page: 0,
      size: 6,
      sort: 'lastModifiedDate,desc'
    }).pipe(takeUntil(this.subject$)).subscribe(
      {
        next: ({projectItemRequests}) => {
          if (projectItemRequests) {
            this.opportunities = projectItemRequests;
          }
        }
      }
    ).add(() => {
      this.loadingOpportunities = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  getOpenedOpportunities(): void {
    this.loadingOpenedOpportunities = true;
    this.projectItemService.getOpportunitiesOpened({
      page: 0,
      size: 4,
      sort: 'lastModifiedDate,desc'
    }).pipe(takeUntil(this.subject$)).subscribe(
      {
        next: ({projectItems}) => {
          if (projectItems) {
            this.openedOpportunities = projectItems;
          }
        }
      }
    ).add(() => {
      this.loadingOpenedOpportunities = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  getOpenedProjectItems(): void {
    this.loadingOpenedProjectItems = true;
    this.projectItemService.queryByFreelancer(this.account.id, {
      page: 0,
      size: 4,
      sort: 'lastModifiedDate,desc'
    }).pipe(takeUntil(this.subject$)).subscribe(
      {
        next: ({body}) => {
          if (body) {
            this.openedProjectItems = body;
          }
        }
      }
    ).add(() => {
      this.loadingOpenedProjectItems = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  getFinishedProjectItems(): void {
    this.loadingFinishedProjectItems = true;
    this.projectItemService.queryByFreelancer(this.account.id, {
      page: 0,
      size: 4,
      sort: 'lastModifiedDate,desc'
    }, true).pipe(takeUntil(this.subject$)).subscribe(
      {
        next: ({body}) => {
          if (body) {
            this.finishedProjectItems = body;
          }
        }
      }
    ).add(() => {
      this.loadingFinishedProjectItems = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  getProjectCountByStatus(): void {
    combineLatest([
      this.projectService.getProjectCountByStatus([ProjectStatus.EXECUTION])
    ]).pipe(takeUntil(this.subject$)).subscribe(([execution]) => {
      this.projectCount!.execution = execution;
    }).add(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  buildTour(): void {
    this.dialogService.open(DashboardGuidedTourDialogComponent, {closeOnBackdropClick: false});
  }

  trackPortfoliosByFn(index: number, item: IPortfolio): number {
    return item?.id as number;
  }

  trackOpportunitiesByFn(index: number, item: IProjectItemRequest): number {
    return item?.id as number;
  }

  trackProjectItemsByFn(index: number, item: IProjectItem): number {
    return item?.id as number;
  }
}
