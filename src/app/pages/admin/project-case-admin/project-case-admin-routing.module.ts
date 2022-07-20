import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ProjectCaseCrudDashboardComponent
} from '../../../entities/cruds/project-case-crud-shared/project-case-crud-dashboard/project-case-crud-dashboard.component';
import {
  ProjectCaseCrudUpdateComponent
} from '../../../entities/cruds/project-case-crud-shared/project-case-crud-update/project-case-crud-update.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ProjectCaseCrudDashboardComponent
  },
  {
    path: 'new',
    component: ProjectCaseCrudUpdateComponent
  },
  {
    path: ':projectCase/update',
    component: ProjectCaseCrudUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectCaseAdminRoutingModule {
}
