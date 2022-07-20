import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductAdminRoutingModule } from './product-admin-routing.module';
import {ProductCrudSharedModule} from "../../../entities/cruds/product-crud-shared/product-crud-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductCrudSharedModule,
    ProductAdminRoutingModule
  ]
})
export class ProductAdminModule { }
