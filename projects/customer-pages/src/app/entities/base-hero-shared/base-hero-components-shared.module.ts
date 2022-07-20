import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForBusinessComponent} from "./for-business/for-business.component";
import {NbButtonModule} from "@nebular/theme";
import {IconCardComponent} from "./icon-card/icon-card.component";



@NgModule({
  declarations: [
    ForBusinessComponent,
    IconCardComponent
  ],
  exports: [
    ForBusinessComponent,
    IconCardComponent
  ],
  imports: [
    CommonModule,
    NbButtonModule
  ]
})
export class BaseHeroComponentsSharedModule { }
