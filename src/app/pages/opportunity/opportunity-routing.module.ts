import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OpportunityDashboardComponent} from '../../entities/opportunity-shared/opportunity-dashboard/opportunity-dashboard.component';
import {OpportunityDetailComponent} from '../../entities/opportunity-shared/opportunity-detail/opportunity-detail.component';
import {OpportunityOpenedRequestsComponent} from '../../entities/opportunity-shared/opportunity-opened-requests/opportunity-opened-requests.component';
import {AuthGuard} from '../../core/interceptor/auth-guard.service';
import {Authority} from '../../constants/authority.constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: OpportunityDashboardComponent
  },
  {
    path: ':opportunityId',
    component: OpportunityDetailComponent
  },
  {
    path: 'opened/list',
    component: OpportunityOpenedRequestsComponent
  },
  {
    path: 'items',
    loadChildren: () => import('../project-item/project-item.module').then(m => m.ProjectItemModule),
    canActivate: [AuthGuard],
    data: {
      authorities: [Authority.ADMIN, Authority.MANAGER, Authority.VENDOR, Authority.FREELANCER],
      isOpportunity: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunityRoutingModule {
}
