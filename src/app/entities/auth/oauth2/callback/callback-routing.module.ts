import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GoogleCallbackComponent} from './google-callback/google-callback.component';

const routes: Routes = [
  {
    path: 'google',
    component: GoogleCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallbackRoutingModule {
}
