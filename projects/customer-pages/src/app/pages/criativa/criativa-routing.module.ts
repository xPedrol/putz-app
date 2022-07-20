import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RenderFormCriativaDetailComponent
} from '../../entities/render-forms/render-form-criativa/render-form-criativa-detail/render-form-criativa-detail.component';

const routes: Routes = [
  {
    path: 'form',
    component: RenderFormCriativaDetailComponent
  },
  {
    path: '',
    component: RenderFormCriativaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriativaRoutingModule { }
