import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RenderFormGaloPocDetailComponent
} from '../../entities/render-forms/render-form-galo-poc/render-form-galo-poc-detail/render-form-galo-poc-detail.component';

const routes: Routes = [
  {
    path: 'form',
    component: RenderFormGaloPocDetailComponent
  },
  {
    path: '',
    component: RenderFormGaloPocDetailComponent
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaloRoutingModule { }
