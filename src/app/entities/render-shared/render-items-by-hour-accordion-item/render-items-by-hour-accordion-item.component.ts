import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IProject} from "../../../models/project.model";
import {BehaviorSubject, combineLatest, Subject} from "rxjs";
import {ProjectService} from "../../../services/project.service";
import {ProjectRenderItemGraphService} from "../../../services/project-render-item-graph.service";
import {takeUntil} from "rxjs/operators";
import {IProjectRenderItemByHourGraph} from "../../../models/project-render-item-by-hour-graph.model";
import {IRenderDetailChartFilter} from "../../../models/render-detail-chart-filter.model";
import {Moment} from "moment";
import {deleteAllUndefinedFields} from "../../../core/utils/deleteField";

@Component({
  selector: 'app-render-items-by-hour-accordion-item',
  templateUrl: './render-items-by-hour-accordion-item.component.html',
  styleUrls: ['./render-items-by-hour-accordion-item.component.scss']
})
export class RenderItemsByHourAccordionItemComponent implements OnInit, OnDestroy {


  project: IProject | undefined;
  subject$: Subject<any>;
  projectRenderItemByHourGraph: IProjectRenderItemByHourGraph[];
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
          this.filterProjectItemByHourGraph(filter);
        }
        if (!filter) {
          this.getProjectItemByHourGraph();
        }
      }
    })
  }

  getProjectItemByHourGraph(req?: any): void {
    this.projectRenderItemGraphService.getProjectItemByHourGraph(this.project.projectRenderSlug, req).pipe(takeUntil(this.subject$)).subscribe(lastDates => {
      this.projectRenderItemByHourGraph = lastDates;
      this.changeDetectorRef.detectChanges();
    });
  }

  filterProjectItemByHourGraph(data: IRenderDetailChartFilter): void {
    let req = {};
    if (data['startDate']) {
      req['start'] = (data['startDate'] as Moment).format('YYYY-MM-DD');
    }
    if (data['endDate']) {
      req['end'] = (data['endDate'] as Moment).format('YYYY-MM-DD');
    }

    req = deleteAllUndefinedFields(req);
    this.getProjectItemByHourGraph(req);
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

}
