import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortfolioDashboardComponent} from '../../entities/portfolio/portfolio-dashboard/portfolio-dashboard.component';
import {PortfolioDetailComponent} from '../../entities/portfolio/portfolio-detail/portfolio-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: PortfolioDashboardComponent
  },
  {
    path: ':login/dashboard',
    component: PortfolioDashboardComponent
  },
  {
    path: ':portfolioId',
    component: PortfolioDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {
}
