import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  RenderFormWineDetailComponent
} from "../../entities/render-forms/render-form-wine/render-form-wine-detail/render-form-wine-detail.component";

const routes: Routes = [
  {
    path: 'form',
    component: RenderFormWineDetailComponent
  },
  {
    path: '',
    component: RenderFormWineDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WineRoutingModule { }
