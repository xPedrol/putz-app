import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompetenceGuideDashboardComponent} from '../../entities/competence-guide-shared/competence-guide-dashboard/competence-guide-dashboard.component';
import {CompetenceGuideDetailComponent} from '../../entities/competence-guide-shared/competence-guide-detail/competence-guide-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: CompetenceGuideDashboardComponent
  },
  {
    path: ':competenceGuideId',
    component: CompetenceGuideDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenceGuideRoutingModule {
}
