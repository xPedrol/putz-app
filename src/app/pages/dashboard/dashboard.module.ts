import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DashboardGeneralSharedModule
} from "../../entities/dashboards/dashboard-general-shared/dashboard-general-shared.module";
import {DashboardRoutingModule} from "./dashboard-routing.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardGeneralSharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
