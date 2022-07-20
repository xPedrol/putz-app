import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  PortfolioManagerComponent
} from '../../../entities/portfolio/portfolio-manager-shared/portfolio-manager/portfolio-manager.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioManagerRoutingModule {
}
