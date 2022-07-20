import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {IProject} from '../../../../models/project.model';
import {IProjectStep, ProjectStep} from '../../../../models/project-step.model';
import {ITimeLineEvent} from '../../../../models/time-line-event.model';
import {Subject} from 'rxjs';
import {TimeLineEventService} from '../../../../services/time-line-event.service';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import {GuidedTourService} from '../../../../../../projects/guided-tour/src/lib/guided-tour.service';
import {isPlatformBrowser} from '@angular/common';
import {GuidedTour} from '../../../../../../projects/guided-tour/src/lib/guided-tour.constants';
import {EventType} from '../../../../models/enums/event-type.model';

@Component({
  selector: 'app-project-resume-card',
  templateUrl: './project-resume-card.component.html',
  styleUrls: ['./project-resume-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectResumeCardComponent implements OnInit {
  subject$: Subject<any>;
  @Input() project: IProject | undefined;
  currentStep: IProjectStep | undefined;
  events: ITimeLineEvent[] | undefined;
  revealed = false;
  newEventsCount = 0;
  isBrowser: boolean;
  eventType = EventType;
  constructor(
    private timelineEventService: TimeLineEventService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: string,
    private guidedTourService: GuidedTourService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.subject$ = new Subject();
  }

  ngOnInit(): void {
    if (this.project) {
      this.project.projectSteps = this.project?.projectSteps?.map(step => {
        const projectStep = new ProjectStep(step);
        if (projectStep.isCurrent) {
          this.currentStep = projectStep;
        }
        return projectStep;
      });
      if (!this.currentStep && this.project?.projectSteps) {
        this.currentStep = this.project.projectSteps[this.project.projectSteps.length - 1];
      }
      if (this.currentStep) {
        this.getEvents();
      }
    }
  }

  getEvents(): void {
    this.timelineEventService.queryWithIds({
      projectId: this.project?.id,
      stepId: this.currentStep?.id
    }).pipe(takeUntil(this.subject$)).subscribe((events) => {
      if (events) {
        this.events = events;
        this.getNewEventsCount();
      }
    }).add(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  getNewEventsCount(): void {
    const now = moment();
    if (this.events) {
      this.newEventsCount = this.events.filter(event => {
        return now.diff(event.createdDate, 'days') <= 3;
      }).length;
    } else {
      this.newEventsCount = 0;
    }
    this.changeDetectorRef.markForCheck();
  }

  buildGuidedTour(): void {
    if (this.isBrowser) {
      const guidedTour: GuidedTour = {
        tourId: `project-resume-card-${this.project?.id}`,
        steps: [
          {
            selector: `#card-header-${this.project?.id}`,
            title: 'Título do projeto',
            content: 'O título do projeto é exibido no topo da página.',
            orientation: 'bottom',
          },
          {
            selector: `#card-tags-${this.project?.id}`,
            title: 'Tags',
            content: 'As tags são utilizadas para agrupar certas caracteristicas. Neste caso, o status do projeto.',
            orientation: 'bottom',
          },
          {
            selector: `#card-step-new-events-${this.project?.id}`,
            title: 'Novos eventos',
            content: 'Eventos criados nos ultimos 3 dias.',
            orientation: 'bottom',
            skipStep: !this.newEventsCount
          },
          {
            selector: `#card-dates-${this.project?.id}`,
            title: 'Data de início e fim',
            content: 'Caso não haja data final somente a data inicial aparecerá.',
            orientation: 'right',
          },
          {
            selector: `#card-value-${this.project?.id}`,
            title: 'Orçamento do projeto',
            content: 'Valor final do projeto.',
            orientation: 'right',
          },
          {
            selector: `#card-days-${this.project?.id}`,
            title: 'Duração do projeto',
            content: 'Quando tempo, em dias, o projeto ficará em desenvolvimento.',
            orientation: 'right',
          },
          {
            selector: `#card-step-${this.project?.id}`,
            title: 'Etapa atual do projeto',
            content: 'Essa é a atual etapa de desenvolvimento, junto de algumas informações como a data de início e términio',
            orientation: 'right',
          },
          {
            selector: `#card-step-events-${this.project?.id}`,
            title: 'Eventos',
            content: 'Eventos da etapa atual do projeto.',
            orientation: 'right',
          },
          {
            selector: `#card-buttons-${this.project?.id}`,
            title: 'Botões',
            content: 'Botões de ação para o projeto. Timeline e pagina de detalhes.',
            orientation: 'top',
          },
        ]
      };
      this.guidedTourService.startTour(guidedTour);
    }
  }

}
