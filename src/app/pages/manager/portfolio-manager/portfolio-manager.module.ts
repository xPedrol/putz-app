import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioManagerRoutingModule } from './portfolio-manager-routing.module';
import {
  PortfolioManagerSharedModule
} from '../../../entities/portfolio/portfolio-manager-shared/portfolio-manager-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PortfolioManagerSharedModule,
    PortfolioManagerRoutingModule
  ]
})
export class PortfolioManagerModule { }
