import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseHeroComponent} from '../../entities/base-hero-shared/base-hero/base-hero.component';

const routes: Routes = [
  {
    path: '',
    component: BaseHeroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseHeroPageRoutingModule {
}
