import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FaqQuestionComponent} from './faq-question/faq-question.component';
import {FaqTypeComponent} from './faq-type/faq-type.component';
import {FaqWrapperComponent} from './faq-wrapper/faq-wrapper.component';
import {RouterModule} from "@angular/router";
import {FaqMenuComponent} from "./faq-menu/faq-menu.component";
import {NbCardModule, NbIconModule, NbMenuModule} from "@nebular/theme";


@NgModule({
  declarations: [
    FaqQuestionComponent,
    FaqTypeComponent,
    FaqWrapperComponent,
    FaqMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbMenuModule,
    NbCardModule,
    NbIconModule
  ]
})
export class FaqSharedModule { }
