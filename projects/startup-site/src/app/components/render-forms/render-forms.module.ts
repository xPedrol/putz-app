import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenderFormsRoutingModule } from './render-forms-routing.module';
import {NgxMaskModule} from "ngx-mask";
import {SmartVideoComoUsarComponent} from "./smart-video-como-usar/smart-video-como-usar.component";
import {SmartVideoFaqComponent} from "./smart-video-faq/smart-video-faq.component";
import {AccordionModule} from "ngx-accordion";

@NgModule({
  declarations: [
    SmartVideoComoUsarComponent,
    SmartVideoFaqComponent
  ],
  exports: [
    SmartVideoComoUsarComponent,
    SmartVideoFaqComponent
  ],
  imports: [
    CommonModule,
    RenderFormsRoutingModule,
    NgxMaskModule.forRoot(),
    AccordionModule
  ]
})
export class RenderFormsModule { }
