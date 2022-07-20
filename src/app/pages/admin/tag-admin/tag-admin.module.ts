import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TagAdminRoutingModule} from './tag-admin-routing.module';
import {TagCrudSharedModule} from '../../../entities/cruds/tag-crud-shared/tag-crud-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TagCrudSharedModule,
    TagAdminRoutingModule
  ]
})
export class TagAdminModule {
}
