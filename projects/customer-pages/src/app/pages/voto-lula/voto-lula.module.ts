import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotoLulaRoutingModule } from './voto-lula-routing.module';
import {
  RenderFormVotoLulaSharedModule
} from "../../entities/render-forms/render-form-voto-lula/render-form-voto-lula-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderFormVotoLulaSharedModule,
    VotoLulaRoutingModule
  ]
})
export class VotoLulaModule { }
