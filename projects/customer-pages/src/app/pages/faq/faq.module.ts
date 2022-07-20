import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FaqRoutingModule} from './faq-routing.module';
import {FaqSharedModule} from "../../entities/faq-shared/faq-shared.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FaqSharedModule,
    FaqRoutingModule
  ]
})
export class FaqModule {
}
