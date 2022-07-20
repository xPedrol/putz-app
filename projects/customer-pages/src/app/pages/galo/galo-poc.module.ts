import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GaloRoutingModule } from './galo-routing.module';
import {RenderFormGaloPocSharedModule} from '../../entities/render-forms/render-form-galo-poc/render-form-galo-poc-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderFormGaloPocSharedModule,
    GaloRoutingModule
  ]
})
export class GaloPocModule { }
