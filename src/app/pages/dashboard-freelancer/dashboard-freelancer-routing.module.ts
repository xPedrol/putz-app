import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  DashboardFreelancerComponent
} from "../../entities/dashboards/dashboard-freelancer-shared/dashboard-freelancer/dashboard-freelancer.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardFreelancerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardFreelancerRoutingModule {
}
