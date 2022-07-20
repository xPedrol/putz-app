import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompetenceGuideRoutingModule} from './competence-guide-routing.module';
import {CompetenceSharedModule} from '../../entities/competence-shared/competence-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompetenceSharedModule,
    CompetenceGuideRoutingModule
  ]
})
export class CompetenceGuideModule { }
