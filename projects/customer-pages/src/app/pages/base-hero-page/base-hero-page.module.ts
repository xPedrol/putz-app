import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseHeroPageRoutingModule } from './base-hero-page-routing.module';
import {BaseHeroSharedModule} from '../../entities/base-hero-shared/base-hero-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseHeroSharedModule,
    BaseHeroPageRoutingModule
  ]
})
export class BaseHeroPageModule { }
