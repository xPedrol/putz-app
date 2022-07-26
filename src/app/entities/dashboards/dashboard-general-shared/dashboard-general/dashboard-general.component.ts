import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {combineLatest, Subject} from "rxjs";
import {IProject} from "../../../../models/project.model";
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
interface IProjectCount {
  conception?: number;
  execution?: number;
}

@Component({
  selector: 'app-dashboard-general',
  templateUrl: './dashboard-general.component.html',
  styleUrls: ['./dashboard-general.component.scss','../../../../shared/themes/nebular-overrides.scss']
})
export class DashboardGeneralComponent implements OnInit,OnDestroy {

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;
  subject$: Subject<any>;


  projects: IProject[] | undefined;
  loadingProjects = false;

  isBrowser: boolean;
  conceptionStatus = {projectStatus: [ProjectStatus.CONCEPTION, ProjectStatus.BRIEFING]};
  projectCount: IProjectCount | undefined;
  currentYear: number;
  selectEchart: FormControl;
  inputEchart: FormControl;
  isFreelancer = false;
  account: IAccount | undefined;
  showAll = false;
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
    this.accountService.accountSubject.pipe().subscribe((account) => {
      if (account) {
        const showAll = this.cookieService.getCookie(this.showAllCookieKey) === 'true';
        const showTourCookie = this.cookieService.getCookie(environment.DASHBOARD_TOUR_KEY);
        this.isFreelancer = account.notHasAnyAuthority([Authority.MANAGER, Authority.ADMIN]) && account.hasAnyAuthority([Authority.FREELANCER]);
        const showTour = (showTourCookie ? !Boolean(showTourCookie) : true) && this.isFreelancer;
        if (showTour) {
          this.buildTour();
        }
        this.getProjects();
        this.getProjectCountByStatus();
        this.account = account;
        this.showAll = showAll;
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


  getProjects(): void {
    this.loadingProjects = true;
    this.projectService.query({
      page: 0,
      size: 4,
      sort: 'lastModifiedDate,desc'
    }).pipe(takeUntil(this.subject$)).subscribe(
      {
        next: ({projects}) => {
          if (projects) {
            this.projects = projects;
          }
        }
      }
    ).add(() => {
      this.loadingProjects = false;
      this.changeDetectorRef.detectChanges();
    });
  }



  getProjectCountByStatus(): void {
    combineLatest([
      this.projectService.getProjectCountByStatus([ProjectStatus.BRIEFING, ProjectStatus.CONCEPTION]),
      this.projectService.getProjectCountByStatus([ProjectStatus.EXECUTION])
    ]).pipe(takeUntil(this.subject$)).subscribe(([conception, execution]) => {
      this.projectCount!.conception = conception;
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

  trackProjectsByFn(index: number, item: IProject): number {
    return item?.id as number;
  }
}
