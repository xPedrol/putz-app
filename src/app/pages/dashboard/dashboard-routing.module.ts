import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DashboardGeneralComponent
} from "../../entities/dashboards/dashboard-general-shared/dashboard-general/dashboard-general.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardGeneralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
