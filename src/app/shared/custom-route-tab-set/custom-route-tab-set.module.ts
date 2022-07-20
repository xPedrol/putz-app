import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomRouteTabSetComponent} from './custom-route-tab-set/custom-route-tab-set.component';
import {RouterModule} from '@angular/router';
import {NbIconModule, NbRouteTabsetModule} from '@nebular/theme';
import { CustomRouteTabComponent } from './custom-route-tab/custom-route-tab.component';


@NgModule({
  declarations: [
    CustomRouteTabSetComponent,
    CustomRouteTabComponent
  ],
  exports: [
    CustomRouteTabSetComponent,
    CustomRouteTabComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    RouterModule
  ]
})
export class CustomRouteTabSetModule extends NbRouteTabsetModule{ }
