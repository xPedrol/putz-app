import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagCrudDashboardComponent } from './tag-crud-dashboard/tag-crud-dashboard.component';
import { TagCrudUpdateComponent } from './tag-crud-update/tag-crud-update.component';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TagCrudListModule} from './tag-crud-list/tag-crud-list.module';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../../shared/pagination-wrap/pagination-wrap.module';



@NgModule({
  declarations: [
    TagCrudDashboardComponent,
    TagCrudUpdateComponent
  ],
  exports:[
    TagCrudDashboardComponent,
    TagCrudUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TagCrudListModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    RouterModule,
    PipeModule,
    PaginationWrapModule
  ]
})
export class TagCrudSharedModule { }
