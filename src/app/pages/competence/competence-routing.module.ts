import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompetenceDashboardComponent} from '../../entities/competence-shared/competence-dashboard/competence-dashboard.component';
import {CompetenceGuideDashboardComponent} from '../../entities/competence-guide-shared/competence-guide-dashboard/competence-guide-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: CompetenceDashboardComponent
  },
  {
    path: ':competenceId/guides',
    component: CompetenceGuideDashboardComponent
  },
  // {
  //   path: ':competenceGuideId',
  //   component: CompetenceGuideDetailComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenceRoutingModule {
}
