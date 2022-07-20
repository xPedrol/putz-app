import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppOneColumnLayoutComponent } from './main-app-one-column-layout/main-app-one-column-layout.component';
import {NbLayoutModule, NbSidebarModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {MainAppLayoutComponentModule} from './main-app-layout-component/main-app-layout-component.module';
import {GuidedTourModule} from '../../../../projects/guided-tour/src/lib/guided-tour.module';



@NgModule({
  declarations: [
    MainAppOneColumnLayoutComponent
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    RouterModule,
    MainAppLayoutComponentModule,
    NbSidebarModule,
    GuidedTourModule
  ]
})
export class MainAppLayoutPageModule { }
