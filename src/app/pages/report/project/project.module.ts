import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import {
  ProjectReportsSharedModule
} from "../../../entities/project-shared/project-reports-shared/project-reports-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProjectReportsSharedModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
