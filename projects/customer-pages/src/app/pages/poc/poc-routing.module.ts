import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RenderFormPocDetailComponent
} from '../../entities/render-forms/render-form-poc/render-form-poc-detail/render-form-poc-detail.component';


const routes: Routes = [
  {
    path: 'form',
    component: RenderFormPocDetailComponent
  },
  {
    path: '',
    component: RenderFormPocDetailComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PocRoutingModule { }
