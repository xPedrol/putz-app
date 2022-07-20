import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriativaRoutingModule } from './criativa-routing.module';
import {
  RenderFormCriativaSharedModule
} from '../../entities/render-forms/render-form-criativa/render-form-criativa-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderFormCriativaSharedModule,
    CriativaRoutingModule
  ]
})
export class CriativaModule { }
