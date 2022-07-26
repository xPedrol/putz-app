import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RenderDetailComponent} from "../../../entities/render-shared/render-detail/render-detail.component";
import {
  RenderDetailTableTabComponent
} from "../../../entities/render-shared/render-detail/render-detail-table-tab/render-detail-table-tab.component";
import {
  RenderDetailChartsTabComponent
} from "../../../entities/render-shared/render-detail/render-detail-charts-tab/render-detail-charts-tab.component";
import {
  RenderDetailErrorsTabComponent
} from "../../../entities/render-shared/render-detail/render-detail-errors-tab/render-detail-errors-tab.component";
import {
  RenderDetailCsvTabComponent
} from "../../../entities/render-shared/render-detail/render-detail-csv-tab/render-detail-csv-tab.component";

const routes: Routes = [
  {
    path: ':renderSlug',
    component: RenderDetailComponent,
    children: [
      {
        path: '',
        component: RenderDetailTableTabComponent
      },
      {
        path: 'table',
        component: RenderDetailTableTabComponent
      },
      {
        path: 'charts',
        component: RenderDetailChartsTabComponent
      },
      {
        path: 'errors',
        component: RenderDetailErrorsTabComponent
      },
      {
        path: 'csv',
        component: RenderDetailCsvTabComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenderRoutingModule {
}
