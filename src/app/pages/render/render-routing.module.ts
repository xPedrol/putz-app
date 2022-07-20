import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  RenderFormPocDetailComponent
} from '../../../../projects/customer-pages/src/app/entities/render-forms/render-form-poc/render-form-poc-detail/render-form-poc-detail.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'creditas',
  //   pathMatch: 'full'
  // },


  // {
  //   path: 'feedback/:renderId/:renderItemId',
  //   component: RenderFormPocDetailComponent,
  // },


  // {
  //   path: 'poc',
  //   component: RenderFormPocDetailComponent,
  // },
  // {
  //   path: 'galo',
  //   component: GaloDetailComponent,
  // },
  // {
  //   path: 'franq',
  //   component: FranqDetailComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenderRoutingModule {
}
