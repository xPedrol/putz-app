import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagCrudTableComponent} from './tag-crud-table/tag-crud-table.component';
import {SharedModule} from '../../../../shared/shared.module';
import {DirectivesModule} from '../../../../directives/directives.module';
import {PipeModule} from '../../../../core/pipes/pipe.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    TagCrudTableComponent
  ],
  exports: [
    TagCrudTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectivesModule,
    PipeModule,
    RouterModule
  ]
})
export class TagCrudListModule {
}
