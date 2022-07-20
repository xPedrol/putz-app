import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OpportunityRoutingModule} from './opportunity-routing.module';
import {OpportunitySharedModule} from '../../entities/opportunity-shared/opportunity-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OpportunitySharedModule,
    OpportunityRoutingModule
  ]
})
export class OpportunityModule { }
