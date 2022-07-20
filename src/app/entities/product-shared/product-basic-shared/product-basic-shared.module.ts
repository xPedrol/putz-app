import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from './product-table/product-table.component';
import {DirectivesModule} from "../../../directives/directives.module";
import {NbButtonModule, NbCheckboxModule, NbIconModule, NbTagModule, NbTooltipModule} from "@nebular/theme";
import {PipeModule} from "../../../core/pipes/pipe.module";
import {RouterModule} from "@angular/router";
import {NbSecurityModule} from "@nebular/security";



@NgModule({
  declarations: [
    ProductTableComponent
  ],
  exports: [
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    NbIconModule,
    NbTagModule,
    PipeModule,
    NbTooltipModule,
    NbCheckboxModule,
    RouterModule,
    NbSecurityModule,
    NbButtonModule
  ]
})
export class ProductBasicSharedModule { }
