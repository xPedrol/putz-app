import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  RenderFormCreditasDetailComponent
} from "../../entities/render-forms/render-form-creditas/render-form-creditas-detail/render-form-creditas-detail.component";

const routes: Routes = [
  {
    path: 'form',
    component: RenderFormCreditasDetailComponent
  },
  {
    path: '',
    component: RenderFormCreditasDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditasRoutingModule { }
