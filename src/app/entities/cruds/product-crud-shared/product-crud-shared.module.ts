import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCrudDashboardComponent } from './product-crud-dashboard/product-crud-dashboard.component';
import {ProductBasicSharedModule} from "../../product-shared/product-basic-shared/product-basic-shared.module";
import {PaginationWrapModule} from "../../../shared/pagination-wrap/pagination-wrap.module";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {
  NbAutocompleteModule,
  NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule,
  NbIconModule, NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTagModule,
  NbTooltipModule
} from "@nebular/theme";
import {RouterModule} from "@angular/router";
import {NbSecurityModule} from "@nebular/security";
import {ComponentsModule} from "../../../shared/components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ProductCrudUpdateComponent } from './product-crud-update/product-crud-update.component';
import {PipeModule} from "../../../core/pipes/pipe.module";
import {NgxCurrencyModule} from "ngx-currency";
import {TranslateModule} from "@ngx-translate/core";
import {ObjectViewerDialogModule} from "../../../shared/components/object-viewer-dialog/object-viewer-dialog.module";



@NgModule({
  declarations: [
    ProductCrudDashboardComponent,
    ProductCrudUpdateComponent
  ],
  imports: [
    CommonModule,
    ProductBasicSharedModule,
    PaginationWrapModule,
    NgbPaginationModule,
    NbSpinnerModule,
    NbTooltipModule,
    RouterModule,
    NbIconModule,
    NbSecurityModule,
    NbButtonModule,
    NbSelectModule,
    ComponentsModule,
    ReactiveFormsModule,
    NbTagModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbDatepickerModule,
    NbCheckboxModule,
    PipeModule,
    NgxCurrencyModule,
    TranslateModule,
    NbAutocompleteModule,
    ObjectViewerDialogModule
  ]
})
export class ProductCrudSharedModule { }
