import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {IProject} from '../../../models/project.model';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ProjectItemService} from '../../../services/project-item.service';
import {combineLatest, Subject} from 'rxjs';
import {ProjectStepService} from '../../../services/project-step.service';
import {HttpHeaders} from '@angular/common/http';
import {ProjectSelectModelDialogComponent} from '../project-select-model-dialog/project-select-model-dialog.component';
import {takeUntil} from 'rxjs/operators';
import {isPlatformBrowser, Location} from '@angular/common';
import {HeadService} from '../../../services/head.service';
import {ProjectListMethodsComponent} from '../lists/project-list-methods/project-list-methods.component';
import {GuidedTour} from '../../../../../projects/guided-tour/src/lib/guided-tour.constants';
import {GuidedTourService} from '../../../../../projects/guided-tour/src/lib/guided-tour.service';
import {ProjectStatus} from '../../../models/enums/project-status.model';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: [
    './project-update.component.scss',
    '../../../shared/themes/nebular-overrides.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProjectUpdateComponent extends ProjectListMethodsComponent implements OnInit, OnDestroy {
  subject$ = new Subject();
  projectId: number | null = null;
  project: IProject | null = null;
  isLoading = false;
  isModelForConception = false;
  isBrowser: boolean;
  projectStatus = ProjectStatus;
  tabs: any[] = [
    // {
    //   title: 'Início',
    //   icon: 'home',
    //   responsive: true,
    //   route: './initial',
    // },
    {
      title: 'Geral',
      icon: 'clipboard-outline',
      responsive: true,
      route: './general',
      name: 'project-basic',
      modelForConception: true,
      description: 'Informações básicas do projeto. Aqui é possível escolher nome, descrição e datas de início e fim. Além de definir o cliente, vendedor, agência e gerente.'
    },
    {
      title: 'Orçamento',
      icon: 'npm-outline',
      responsive: true,
      route: './conception',
      name: 'conception',
      description: 'Página de orçamento. Aqui é possível escolher o modelo de orçamento, por meio de uma calculadora de preços, e definir os itens do projeto.'
    },
    {
      title: 'Cronograma',
      icon: 'clock-outline',
      responsive: true,
      route: './schedules',
      name: 'project-step',
      description: 'Tabela de cronograma. Aqui é possível definir datas esperadas de início e fim de cada etapa do projeto. Além de editar as datas reais.'
    },
    {
      title: 'Itens',
      icon: 'file-text-outline',
      responsive: true,
      route: './items',
      name: 'project-item',
      description: 'Tabela de itens. Diferente do cronograma, aqui é possível definir o valor de cada item e editar as demais informações das etapas.'
    },
    {
      title: 'Contrato',
      icon: 'clipboard-outline',
      responsive: true,
      route: './contract',
      name: 'project-contract',
      description: 'Página de contrato. Aqui é possível submeter um contrato para o projeto, ou acompanhar o atual.'
    }
    // {
    //   title: 'Renderização',
    //   icon: 'film-outline',
    //   responsive: true,
    //   route: './rendering',
    //   name: 'render',
    //   description: 'Pagina de solicitações de freelancers. Aqui é onde aparece todas as requisiçoes de trabalho. É possivel aprovar ou recusar a solicitação.'
    // },
  ];

  constructor(
    public projectService: ProjectService,
    public projectItemService: ProjectItemService,
    private projectStepService: ProjectStepService,
    private activatedRoute: ActivatedRoute,
    public dialogService: NbDialogService,
    private location: Location,
    private headService: HeadService,
    public toastService: NbToastrService,
    @Inject(PLATFORM_ID) platformId: string,
    private guidedTourService: GuidedTourService,
  ) {
    super(projectService, toastService, dialogService);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project && project !== this.project) {
        this.project = project;
      }
    });
    combineLatest([
      this.activatedRoute.params
    ]).subscribe((res) => {
      const params = res[0] ?? {};
      if (params!.projectId !== 'new') {
        this.isModelForConception = false;
        this.projectId = Number(params!.projectId);
        if (this.projectId) {
          this.getProject(this.projectId);
        }
      } else {
        this.openProjectSelectModelDialog();
      }
    });
  }

  getProject(projectId: number): void {
    if (projectId) {
      this.isLoading = true;
      this.projectService.find(projectId, false).pipe(takeUntil(this.subject$)).subscribe({
        next: project => this.projectHandle(project),
      }).add(() => this.isLoading = false);
    }
  }

  projectHandle(project: IProject): void {
    this.project = project;
    this.headService.setTitle(`${this.project?.name}`);
    if (this.project) {
      const projectItemRequestIndex = this.findIndexTabByName('project-item-request');
      if (projectItemRequestIndex > -1 && (this.project.projectStatus === this.projectStatus.CONCEPTION || this.project.projectStatus === this.projectStatus.BRIEFING)) {
        this.tabs.splice(projectItemRequestIndex, 1);
      } else if (projectItemRequestIndex === -1 && (this.project.projectStatus !== this.projectStatus.CONCEPTION && this.project.projectStatus !== this.projectStatus.BRIEFING)) {
        this.tabs.push({
          title: 'Inscrições',
          icon: 'paper-plane-outline',
          responsive: true,
          route: './items/requests',
          name: 'project-item-request',
          description: 'Página de inscrições de freelancers. Aqui é onde aparece todas as requisições de trabalho. É possível aprovar ou recusar a solicitação.'
        });
      }
      const renderTabIndex = this.findIndexTabByName('render');
      if (renderTabIndex > -1 && !this.project.projectRenderId) {
        this.tabs[renderTabIndex].disabled = true;
      }
      this.project.modelForConception = this.isModelForConception;
      this.project.verifyCanEdit();
      this.project.verifyCanClose();
      // PROJECT STEPS VINDO DO PROJETO
      // if (this.project?.projectSteps) {
      //   const projectSteps = this.projectStepService.convertProjectSteps(this.project.projectSteps);
      //   this.projectStepService.setProjectSteps({projectSteps, headers: new HttpHeaders()});
      // }
      // PROJECT ITEMS VINDO DO PROJETO
      // if (this.project?.items) {
      //   const projectItems = this.projectItemService.convertProjectItems(this.project.items);
      //   this.projectItemService.setProjectItems({projectItems});
      // }
      if (this.project?.negotiationCalc) {
        this.projectService.negotiationCalc$.next(this.project.negotiationCalc);
      }
      this.projectService.project$.next(project);
    }
  }


  openProjectSelectModelDialog(): void {
    this.dialogService.open(ProjectSelectModelDialogComponent, {
      closeOnBackdropClick: false
    }).onClose.pipe(takeUntil(this.subject$)).subscribe((projectModel: IProject) => {
      if (projectModel && projectModel?.id) {
        this.isModelForConception = true;
        this.getProject(projectModel.id);
      } else {
        this.location.back();
      }
    });
  }

  findIndexTabByName(tabName: string): number {
    for (const i in this.tabs) {
      if (this.tabs[i].name == tabName) {
        return Number(i);
      }
    }
    return -1;
  }

  ngOnDestroy(): void {
    this.projectService.clearProject();
    this.projectItemService.clearProjectItems();
    this.projectStepService.clearProjectSteps();
    this.subject$.next(null);
    this.subject$.complete();
  }

  buildTour(): void {
    if (this.isBrowser) {
      const guidedTour: GuidedTour = {
        tourId: `project-resume-card-${this.project?.id}`,
        steps: this.tabs.map((tab) => {
          return {
            selector: `#tab-${tab.name}`,
            title: tab.title,
            content: tab?.description ?? '---',
            orientation: 'bottom',
          };
        })
      };
      this.guidedTourService.startTour(guidedTour);
    }
  }
}
