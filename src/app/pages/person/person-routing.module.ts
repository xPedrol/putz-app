import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PeopleDashboardComponent} from '../../entities/people-shared/people-dashboard/people-dashboard.component';
import {PeopleDetailComponent} from '../../entities/people-shared/people-detail/people-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: PeopleDashboardComponent
  },
  {
    path: ':personLogin',
    component: PeopleDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule {
}
