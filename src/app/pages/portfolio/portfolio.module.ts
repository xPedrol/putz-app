import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PortfolioRoutingModule} from './portfolio-routing.module';
import {PortfolioSharedModule} from '../../entities/portfolio/portfolio-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PortfolioSharedModule,
    PortfolioRoutingModule
  ]
})
export class PortfolioModule { }
