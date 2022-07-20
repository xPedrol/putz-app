import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderClientDetailComponent} from './render-client-detail/render-client-detail.component';
import {NbAlertModule, NbCardModule, NbIconModule} from '@nebular/theme';


@NgModule({
  declarations: [RenderClientDetailComponent],
  imports: [
    CommonModule,
    NbAlertModule,
    NbCardModule,
    NbIconModule
  ],
  exports: [
    RenderClientDetailComponent
  ]
})
export class RenderFormConfigsModule {
}
