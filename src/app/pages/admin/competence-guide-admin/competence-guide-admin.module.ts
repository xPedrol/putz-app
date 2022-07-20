import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetenceGuideAdminRoutingModule } from './competence-guide-admin-routing.module';
import {
  CompetenceGuideCrudSharedModule
} from '../../../entities/cruds/competence-guide-crud-shared/competence-guide-crud-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompetenceGuideCrudSharedModule,
    CompetenceGuideAdminRoutingModule
  ]
})
export class CompetenceGuideAdminModule { }
