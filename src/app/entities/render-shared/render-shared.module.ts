import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderTableComponent} from './render-table/render-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {NgxCurrencyModule} from 'ngx-currency';
import {RenderDetailComponent} from './render-detail/render-detail.component';
import {PipeModule} from '../../core/pipes/pipe.module';
import {DirectivesModule} from '../../directives/directives.module';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {TranslateModule} from '@ngx-translate/core';
import {NgxMaskModule} from 'ngx-mask';
import {ImageCropperModule} from 'ngx-image-cropper';
import {
  RenderExportCsvConfirmDialogComponent
} from './render-export-csv-confirm-dialog/render-export-csv-confirm-dialog.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../shared/pagination-wrap/pagination-wrap.module';
import {RouterModule} from '@angular/router';
import {RenderDetailFilterDialogComponent} from './render-detail-filter-dialog/render-detail-filter-dialog.component';
import {
  RenderItemsByMonthLineChartComponent
} from './render-items-by-month-line-chart/render-items-by-month-line-chart.component';
import {NgChartsModule} from 'ng2-charts';
import {
  RenderItemsByMonthAccordionItemComponent
} from './render-items-by-month-accordion-item/render-items-by-month-accordion-item.component';
import {
  RenderItemsByDayAccordionItemComponent
} from './render-items-by-day-accordion-item/render-items-by-day-accordion-item.component';
import {
  RenderItemsByDayLineChartComponent
} from './render-items-by-day-line-chart/render-items-by-day-line-chart.component';
import {
  RenderItemsByHourLineChartComponent
} from './render-items-by-hour-line-chart/render-items-by-hour-line-chart.component';
import {
  RenderItemsByHourAccordionItemComponent
} from './render-items-by-hour-accordion-item/render-items-by-hour-accordion-item.component';
import {RenderDetailTableTabComponent} from './render-detail/render-detail-table-tab/render-detail-table-tab.component';
import {
  RenderDetailChartsTabComponent
} from './render-detail/render-detail-charts-tab/render-detail-charts-tab.component';
import {ApprovedNamesDialogComponent} from './approved-names-dialog/approved-names-dialog.component';
import {
  RenderDetailErrorsTabComponent
} from './render-detail/render-detail-errors-tab/render-detail-errors-tab.component';
import {RenderDetailCsvTabComponent} from './render-detail/render-detail-csv-tab/render-detail-csv-tab.component';
import {CsvUploadComponent} from './csv-upload/csv-upload.component';
import {RenderBasicSharedModule} from "./render-basic-shared.module";


@NgModule({
  declarations: [
    RenderTableComponent,
    RenderDetailComponent,
    RenderExportCsvConfirmDialogComponent,
    RenderDetailFilterDialogComponent,
    RenderItemsByMonthLineChartComponent,
    RenderItemsByMonthAccordionItemComponent,
    RenderItemsByDayAccordionItemComponent,
    RenderItemsByDayLineChartComponent,
    RenderItemsByHourLineChartComponent,
    RenderItemsByHourAccordionItemComponent,
    RenderDetailTableTabComponent,
    RenderDetailChartsTabComponent,
    ApprovedNamesDialogComponent,
    RenderDetailErrorsTabComponent,
    RenderDetailCsvTabComponent,
    CsvUploadComponent
  ],
  exports: [
    RenderTableComponent,
    RenderDetailComponent,
    RenderExportCsvConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    PipeModule,
    DirectivesModule,
    NgbPaginationModule,
    NgxDropzoneModule,
    TranslateModule,
    NgxMaskModule,
    ImageCropperModule,
    FormsModule,
    PaginationWrapModule,
    RouterModule,
    NgChartsModule,
    RenderBasicSharedModule
  ]
})
export class RenderSharedModule {
}
