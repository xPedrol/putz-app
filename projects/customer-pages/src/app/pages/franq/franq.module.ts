import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranqRoutingModule } from './franq-routing.module';
import {
  RenderFormFranqPocSharedModule
} from "../../entities/render-forms/render-form-franq-poc/render-form-franq-poc-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderFormFranqPocSharedModule,
    FranqRoutingModule
  ]
})
export class FranqModule { }
