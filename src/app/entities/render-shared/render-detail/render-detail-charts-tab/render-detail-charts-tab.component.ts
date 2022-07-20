import {Component, OnInit} from '@angular/core';
import {projectRenderItemStatus} from "../../../../models/enums/project-render-item-status.model";
import {FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {IRenderDetailChartFilter} from "../../../../models/render-detail-chart-filter.model";

@Component({
  selector: 'app-render-detail-charts-tab',
  templateUrl: './render-detail-charts-tab.component.html',
  styleUrls: ['./render-detail-charts-tab.component.scss']
})
export class RenderDetailChartsTabComponent implements OnInit {
  projectRenderItemStatus = projectRenderItemStatus;
  projectItemByMonthGraphForm: FormGroup;
  filter$: BehaviorSubject<IRenderDetailChartFilter>;

  constructor() {
  }

  ngOnInit(): void {
    this.filter$ = new BehaviorSubject<IRenderDetailChartFilter>(null);
    this.projectItemByMonthGraphForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      status: new FormControl()
    });
  }


  filterProjectItemByMonthGraph(): void {
    this.filter$.next(this.projectItemByMonthGraphForm.getRawValue());
  }

  clearProjectItemByMonthGraph(): void {
    this.projectItemByMonthGraphForm.reset();
    this.filter$.next(null);
  }

}
