import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  RenderFormFranqPocDetailComponent
} from "../../entities/render-forms/render-form-franq-poc/render-form-franq-poc-detail/render-form-franq-poc-detail.component";

const routes: Routes = [
  {
    path: '',
    component: RenderFormFranqPocDetailComponent
  },
  {
    path: 'form',
    component: RenderFormFranqPocDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranqRoutingModule {
}
