import {ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {Subject} from "rxjs";
import {ITimeLineEvent} from "../../../../models/time-line-event.model";
import {EventType} from "../../../../models/enums/event-type.model";
import {TimeLineEventService} from "../../../../services/time-line-event.service";
import {GuidedTourService} from "../../../../../../projects/guided-tour/src/lib/guided-tour.service";
import {isPlatformBrowser} from "@angular/common";
import {takeUntil} from "rxjs/operators";
import * as moment from "moment";
import {IProjectItem} from "../../../../models/project-item.model";

@Component({
  selector: 'app-project-item-freelancer-card',
  templateUrl: './project-item-freelancer-card.component.html',
  styleUrls: ['./project-item-freelancer-card.component.scss']
})
export class ProjectItemFreelancerCardComponent implements OnInit {

  subject$: Subject<any>;
  @Input() projectItem: IProjectItem;
  events: ITimeLineEvent[];
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
    if (this.projectItem) {
           this.getEvents();

    }
  }

  getEvents(): void {
    this.timelineEventService.queryWithIds({
      projectId: this.projectItem?.project?.id,
      stepId: this.projectItem?.projectStep?.id
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
    // if (this.isBrowser) {
    //   const guidedTour: GuidedTour = {
    //     tourId: `project-resume-card-${this.project?.id}`,
    //     steps: [
    //       {
    //         selector: `#card-header-${this.project?.id}`,
    //         title: 'Título do projeto',
    //         content: 'O título do projeto é exibido no topo da página.',
    //         orientation: 'bottom',
    //       },
    //       {
    //         selector: `#card-tags-${this.project?.id}`,
    //         title: 'Tags',
    //         content: 'As tags são utilizadas para agrupar certas caracteristicas. Neste caso, o status do projeto.',
    //         orientation: 'bottom',
    //       },
    //       {
    //         selector: `#card-step-new-events-${this.project?.id}`,
    //         title: 'Novos eventos',
    //         content: 'Eventos criados nos ultimos 3 dias.',
    //         orientation: 'bottom',
    //         skipStep: !this.newEventsCount
    //       },
    //       {
    //         selector: `#card-dates-${this.project?.id}`,
    //         title: 'Data de início e fim',
    //         content: 'Caso não haja data final somente a data inicial aparecerá.',
    //         orientation: 'right',
    //       },
    //       {
    //         selector: `#card-value-${this.project?.id}`,
    //         title: 'Orçamento do projeto',
    //         content: 'Valor final do projeto.',
    //         orientation: 'right',
    //       },
    //       {
    //         selector: `#card-days-${this.project?.id}`,
    //         title: 'Duração do projeto',
    //         content: 'Quando tempo, em dias, o projeto ficará em desenvolvimento.',
    //         orientation: 'right',
    //       },
    //       {
    //         selector: `#card-step-${this.project?.id}`,
    //         title: 'Etapa atual do projeto',
    //         content: 'Essa é a atual etapa de desenvolvimento, junto de algumas informações como a data de início e términio',
    //         orientation: 'right',
    //       },
    //       {
    //         selector: `#card-step-events-${this.project?.id}`,
    //         title: 'Eventos',
    //         content: 'Eventos da etapa atual do projeto.',
    //         orientation: 'right',
    //       },
    //       {
    //         selector: `#card-buttons-${this.project?.id}`,
    //         title: 'Botões',
    //         content: 'Botões de ação para o projeto. Timeline e pagina de detalhes.',
    //         orientation: 'top',
    //       },
    //     ]
    //   };
    //   this.guidedTourService.startTour(guidedTour);
    // }
  }


}
