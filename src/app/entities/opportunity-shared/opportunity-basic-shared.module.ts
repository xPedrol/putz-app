import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpportunityListComponent} from "./opportunity-list/opportunity-list.component";
import {NbButtonModule, NbCardModule, NbTagModule, NbTooltipModule, NbUserModule} from "@nebular/theme";
import {PipeModule} from "../../core/pipes/pipe.module";
import {RouterModule} from "@angular/router";
import {NbSecurityModule} from "@nebular/security";


@NgModule({
  declarations: [
    OpportunityListComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbTagModule,
    PipeModule,
    RouterModule,
    NbUserModule,
    NbButtonModule,
    NbSecurityModule,
    NbTooltipModule
  ],
  exports: [
    OpportunityListComponent
  ]
})
export class OpportunityBasicSharedModule {
}
