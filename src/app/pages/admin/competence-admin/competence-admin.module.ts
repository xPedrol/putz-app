import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetenceAdminRoutingModule } from './competence-admin-routing.module';
import {
  CompetenceCrudSharedModule
} from '../../../entities/cruds/competence-crud-shared/competence-crud-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompetenceCrudSharedModule,
    CompetenceAdminRoutingModule
  ]
})
export class CompetenceAdminModule { }
