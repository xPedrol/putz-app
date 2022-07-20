import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WineRoutingModule } from './wine-routing.module';
import {RenderFormWineSharedModule} from "../../entities/render-forms/render-form-wine/render-form-wine-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderFormWineSharedModule,
    WineRoutingModule
  ]
})
export class WineModule { }
