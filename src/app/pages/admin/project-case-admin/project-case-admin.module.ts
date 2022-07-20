import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectCaseAdminRoutingModule } from './project-case-admin-routing.module';
import {
  ProjectCaseCrudSharedModule
} from '../../../entities/cruds/project-case-crud-shared/project-case-crud-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProjectCaseCrudSharedModule,
    ProjectCaseAdminRoutingModule
  ]
})
export class ProjectCaseAdminModule { }
