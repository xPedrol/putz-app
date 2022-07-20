import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleCallbackComponent} from './google-callback/google-callback.component';
import {CallbackRoutingModule} from './callback-routing.module';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    GoogleCallbackComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CallbackRoutingModule
  ]
})
export class CallbackModule {
}
