import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ProjectReportManagerComponent
} from "../../../entities/project-shared/project-reports-shared/project-report-manager/project-report-manager.component";

const routes: Routes = [

  {
    path: 'manager',
    component: ProjectReportManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
