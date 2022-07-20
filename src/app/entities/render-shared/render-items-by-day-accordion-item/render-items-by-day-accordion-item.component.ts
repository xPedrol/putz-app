import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IProject} from "../../../models/project.model";
import {Subject, combineLatest, BehaviorSubject} from "rxjs";
import {ProjectService} from "../../../services/project.service";
import {ProjectRenderItemGraphService} from "../../../services/project-render-item-graph.service";
import {takeUntil} from "rxjs/operators";
import {IProjectRenderItemByDayGraph} from "../../../models/project-render-item-by-day-graph.model";
import {IRenderDetailChartFilter} from "../../../models/render-detail-chart-filter.model";
import {Moment} from "moment";
import {deleteAllUndefinedFields} from "../../../core/utils/deleteField";

@Component({
  selector: 'app-render-items-by-day-accordion-item',
  templateUrl: './render-items-by-day-accordion-item.component.html',
  styleUrls: ['./render-items-by-day-accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderItemsByDayAccordionItemComponent implements OnInit, OnDestroy {

  project: IProject | undefined;
  subject$: Subject<any>;
  projectRenderItemByDayGraph: IProjectRenderItemByDayGraph[];
  @Input() filter$: BehaviorSubject<IRenderDetailChartFilter>;

  constructor(
    private projectService: ProjectService,
    private projectRenderItemGraphService: ProjectRenderItemGraphService,
    private changeDetectorRef: ChangeDetectorRef
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
          this.filterProjectItemByDayGraph(filter);
        }
        if (!filter) {
          this.getProjectItemByDayGraph();
        }
      }
    })
  }

  getProjectItemByDayGraph(req?: any): void {
    this.projectRenderItemGraphService.getProjectItemByDayGraph(this.project.projectRenderSlug, req).pipe(takeUntil(this.subject$)).subscribe(lastDates => {
      this.projectRenderItemByDayGraph = lastDates;
      this.changeDetectorRef.detectChanges();
    });
  }

  filterProjectItemByDayGraph(data: IRenderDetailChartFilter): void {
    let req = {};
    if (data['startDate']) {
      req['start'] = (data['startDate'] as Moment).format('YYYY-MM-DD');
    }
    if (data['endDate']) {
      req['end'] = (data['endDate'] as Moment).format('YYYY-MM-DD');
    }

    req = deleteAllUndefinedFields(req);
    this.getProjectItemByDayGraph(req);
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
