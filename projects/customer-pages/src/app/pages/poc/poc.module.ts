import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PocRoutingModule } from './poc-routing.module';
import {RenderFormPocSharedModule} from '../../entities/render-forms/render-form-poc/render-form-poc-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderFormPocSharedModule,
    PocRoutingModule
  ]
})
export class PocModule { }
