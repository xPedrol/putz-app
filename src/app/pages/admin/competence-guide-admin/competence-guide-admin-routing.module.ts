import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CompetenceGuideCrudDashboardComponent
} from '../../../entities/cruds/competence-guide-crud-shared/competence-guide-crud-dashboard/competence-guide-crud-dashboard.component';
import {
  CompetenceGuideCrudUpdateComponent
} from '../../../entities/cruds/competence-guide-crud-shared/competence-guide-crud-update/competence-guide-crud-update.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: CompetenceGuideCrudDashboardComponent
  },
  {
    path: 'new',
    component: CompetenceGuideCrudUpdateComponent
  },
  {
    path: ':competenceGuideId/update',
    component: CompetenceGuideCrudUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenceGuideAdminRoutingModule { }
