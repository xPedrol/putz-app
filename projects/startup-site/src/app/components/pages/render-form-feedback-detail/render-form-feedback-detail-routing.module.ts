import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RenderFormFeedbackDetailComponent} from './render-form-feedback-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RenderFormFeedbackDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenderFormFeedbackDetailRoutingModule {
}
