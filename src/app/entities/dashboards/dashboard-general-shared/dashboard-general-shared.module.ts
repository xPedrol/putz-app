import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardSharedModule} from "../dashboard-shared/dashboard-shared.module";
import {DashboardGeneralComponent} from './dashboard-general/dashboard-general.component';
import {NbButtonModule, NbIconModule, NbSpinnerModule, NbTooltipModule} from "@nebular/theme";
import {RouterModule} from "@angular/router";
import {ComponentsModule} from "../../../shared/components/components.module";
import {ProjectBasicSharedModule} from "../../project-shared/project-basic-shared.module";
import {NbSecurityModule} from "@nebular/security";


@NgModule({
  declarations: [
    DashboardGeneralComponent
  ],
  imports: [
    CommonModule,
    DashboardSharedModule,
    NbSpinnerModule,
    NbButtonModule,
    RouterModule,
    NbIconModule,
    ComponentsModule,
    NbTooltipModule,
    ProjectBasicSharedModule,
    NbSecurityModule
  ]
})
export class DashboardGeneralSharedModule { }
