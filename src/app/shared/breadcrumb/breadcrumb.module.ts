import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {NebularModule} from '../nebular-components/nebular.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    RouterModule
  ],
  exports: [
    BreadcrumbComponent
  ]
})
export class BreadcrumbModule {
}
