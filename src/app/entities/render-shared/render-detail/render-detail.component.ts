import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {IProject} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';
import {HeadService} from '../../../services/head.service';
import {takeUntil} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {JobService} from '../../../services/job.service';
import {NbDialogService, NbRouteTab, NbRouteTabsetComponent, NbToastrService} from '@nebular/theme';
import {ProjectRenderService} from '../../../services/project-render.service';
import {IRenderAverageTime} from '../../../models/renderAverageTime.model';
import {RenderDetailService} from './render-detail.service';
import {ProjectRenderItemService} from '../../../services/project-render-item.service';
import {ApprovedNamesDialogComponent} from '../approved-names-dialog/approved-names-dialog.component';
import {IProjectRenderGroupName} from '../../../models/project-render-group-name.model';
import {IProjectRender} from '../../../models/project-render.model';

@Component({
  selector: 'app-render-detail',
  templateUrl: './render-detail.component.html',
  styleUrls: ['./render-detail.component.scss', '../../../shared/themes/nebular-overrides.scss'],
  providers: [
    RenderDetailService
  ]
})
export class RenderDetailComponent implements OnInit, OnDestroy {
  @ViewChild('routeTabsetComponent', {static: true}) routeTabsetComponent: NbRouteTabsetComponent;
  subject$: Subject<any>;
  project: IProject | undefined;
  projectRender: IProjectRender;
  pagesApp = environment.PAGES_APP_URL;
  renderAverageTime: IRenderAverageTime;
  renderEndPrevision: number;
  tabs: NbRouteTab[] = [
    {
      title: 'Tabela de vídeos',
      icon: 'list-outline',
      route: './table',
    },
    {
      title: 'Gráficos',
      icon: 'pie-chart-outline',
      route: './charts',
    },
    {
      title: 'Erros de Renderização',
      icon: 'pie-chart-outline',
      route: './errors',
    }
  ];
  isTableRoute: boolean;

  constructor(
    private projectRenderService: ProjectRenderService,
    private projectService: ProjectService,
    private jobService: JobService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private toastService: NbToastrService,
    private dialogService: NbDialogService,
    private headService: HeadService,
    public renderDetailService: RenderDetailService,
    public projectRenderItemService: ProjectRenderItemService
  ) {
    this.subject$ = new Subject<any>();

  }

  ngOnInit(): void {
    this.getParams();
  }


  getParams(): void {
    const splittedUrl = this.router.url.split('/');
    const lastParam = splittedUrl[splittedUrl.length - 1];
    if (!lastParam.includes('table') && this.isTableRoute) {
      this.isTableRoute = false;
    }
    this.activatedRoute.params.subscribe(params => {
      if (params?.projectId) {
        this.getProject(params?.projectId);
      }
    });
    this.isTableRoute = this.router.url.includes('table') || (!this.router.url.includes('table') && !this.router.url.includes('charts'));
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
        this.getAverageTimeRender();
        this.getRenderEndPrevision();
        this.getProjectRender();
      }
    });
    this.routeTabsetComponent.changeTab.subscribe(tab => {
      this.isTableRoute = tab.route.includes('table');
    });

  }

  getProjectRender(): void {
    if (this.project) {
      this.projectRenderService.findWithProjectIdAndRenderId(this.project.id, this.project.projectRenderId).subscribe(res => {
        this.projectRender = res;
        this.handleTabs();
      });
    }
  }

  openTableFunction(functionName: string) {
    this.renderDetailService.renderDetailData$.next(functionName);
  }

  getAverageTimeRender(): void {
    this.projectRenderService.getRenderAveragePerVideoAllProcess(this.project.projectRenderSlug).subscribe(res => {
      this.renderAverageTime = res;
    });
  }

  synchronizeAudioNames(): void {
    this.projectRenderService.synchronizeAudioNamesByRenderId(this.project.projectRenderId).subscribe((res) => {
      this.toastService.show('', 'Sincronizado com sucesso', {status: 'success'});
      this.openApprovedNamesDialog(res);
    });
  }

  openApprovedNamesDialog(res?: IProjectRenderGroupName[]): void {
    if (this.project?.projectRenderId) {
      this.dialogService.open(ApprovedNamesDialogComponent,
        {
          context: {
            renderSlug: this.project.projectRenderSlug,
            projectRenderSyncNames: res
          }
        }
      ).onClose.subscribe(() => {

      });
    }
  }

  getRenderEndPrevision(): void {
    this.projectRenderService.getRenderEndPrevision(this.project.projectRenderSlug).subscribe(res => {
      this.renderEndPrevision = res;
    });
  }

  getProject(projectId: number | null): void {
    if (projectId) {
      this.projectService.find(projectId, true).pipe(takeUntil(this.subject$)).subscribe(project => {
        this.project = project;
        this.headService.setTitle(`${this.project?.name} (Renderização)`);
      });
    }
  }

  handleTabs(): void {
    if (this.projectRender.isCsvRenderProject) {
      this.tabs.push({
        title: 'Upload de CSV',
        icon: 'pie-chart-outline',
        route: './csv',
      },);
    } else {
      this.tabs = this.tabs.filter(tab => tab.title !== 'Upload de CSV');
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
