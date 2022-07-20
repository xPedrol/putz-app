import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  RenderFormVotoLulaDetailComponent
} from "../../entities/render-forms/render-form-voto-lula/render-form-voto-lula-detail/render-form-voto-lula-detail.component";

const routes: Routes = [
  {
    path: '',
    component: RenderFormVotoLulaDetailComponent
  },
  {
    path: 'form',
    component: RenderFormVotoLulaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VotoLulaRoutingModule {
}
