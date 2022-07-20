import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  CompetenceCrudDashboardComponent
} from '../../../entities/cruds/competence-crud-shared/competence-crud-dashboard/competence-crud-dashboard.component';
import {
  CompetenceCrudUpdateComponent
} from '../../../entities/cruds/competence-crud-shared/competence-crud-update/competence-crud-update.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CompetenceCrudDashboardComponent
  },
  {
    path: 'new',
    component: CompetenceCrudUpdateComponent
  },
  {
    path: ':competenceId/update',
    component: CompetenceCrudUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenceAdminRoutingModule {
}
