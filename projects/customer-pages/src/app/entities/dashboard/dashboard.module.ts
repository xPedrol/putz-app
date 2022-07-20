import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NbLayoutModule} from '@nebular/theme';
import {BaseHeroSharedModule} from '../base-hero-shared/base-hero-shared.module';
import {RouterModule} from '@angular/router';
import {BaseHeroComponentsSharedModule} from "../base-hero-shared/base-hero-components-shared.module";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports:[
    DashboardComponent
  ],
    imports: [
        CommonModule,
        NbLayoutModule,
        BaseHeroSharedModule,
        RouterModule,
        BaseHeroComponentsSharedModule
    ]
})
export class DashboardModule { }
