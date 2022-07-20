import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditasRoutingModule } from './creditas-routing.module';
import {
  RenderFormCreditasSharedModule
} from "../../entities/render-forms/render-form-creditas/render-form-creditas-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderFormCreditasSharedModule,
    CreditasRoutingModule
  ]
})
export class CreditasModule { }
