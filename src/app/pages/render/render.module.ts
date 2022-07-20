import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenderRoutingModule } from './render-routing.module';
import {RenderSharedModule} from '../../entities/render-shared/render-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RenderSharedModule,
    RenderRoutingModule
  ]
})
export class RenderModule { }
