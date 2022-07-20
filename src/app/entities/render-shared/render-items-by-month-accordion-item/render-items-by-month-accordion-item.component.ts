import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Moment} from "moment";
import {deleteAllUndefinedFields} from "../../../core/utils/deleteField";
import {takeUntil} from "rxjs/operators";
import {ProjectService} from "../../../services/project.service";
import {IProject} from "../../../models/project.model";
import {BehaviorSubject, combineLatest, Subject} from "rxjs";
import {ProjectRenderItemGraphService} from "../../../services/project-render-item-graph.service";
import {IProjectRenderItemByMonthGraph} from "../../../models/projectItemByMonthGraph.model";
import {IRenderDetailChartFilter} from "../../../models/render-detail-chart-filter.model";

@Component({
  selector: 'app-render-items-by-month-accordion-item',
  templateUrl: './render-items-by-month-accordion-item.component.html',
  styleUrls: ['./render-items-by-month-accordion-item.component.scss']
})
export class RenderItemsByMonthAccordionItemComponent implements OnInit, OnDestroy {

  project: IProject | undefined;
  subject$: Subject<any>;
  projectRenderItemByMonthGraph: IProjectRenderItemByMonthGraph[];
  @Input() filter$: BehaviorSubject<IRenderDetailChartFilter>;

  constructor(
    private projectService: ProjectService,
    private projectRenderItemGraphService: ProjectRenderItemGraphService
  ) {
    this.subject$ = new Subject<any>();

  }

  ngOnInit(): void {
    combineLatest([
      this.projectService.project$,
      this.filter$
    ]).pipe(takeUntil(this.subject$)).subscribe(([project, filter]) => {
      if (project) {
        this.project = project;
        if (filter) {
          this.filterProjectItemByMonthGraph(filter);
        }
        if (!filter) {
          this.getProjectItemByMonthGraph();
        }
      }
    })
  }

  filterProjectItemByMonthGraph(data: IRenderDetailChartFilter): void {
    let req = {};
    if (data['startDate']) {
      req['date'] = (data['startDate'] as Moment).format('MM-YYYY');
    }
    if (data['status']) {
      req['status'] = data['status']
    }

    req = deleteAllUndefinedFields(req);
    this.getProjectItemByMonthGraph(req);
  }

  getProjectItemByMonthGraph(req?: any): void {
    this.projectRenderItemGraphService.getProjectItemByMonthGraph(this.project.projectRenderSlug, req).pipe(takeUntil(this.subject$)).subscribe(lastDates => {
      this.projectRenderItemByMonthGraph = lastDates;
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
