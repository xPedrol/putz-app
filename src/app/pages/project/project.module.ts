import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {ProjectSharedModule} from '../../entities/project-shared/project-shared.module';
import {
  RenderFormPocSharedModule
} from '../../../../projects/customer-pages/src/app/entities/render-forms/render-form-poc/render-form-poc-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProjectSharedModule,
    RenderFormPocSharedModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule {
}
