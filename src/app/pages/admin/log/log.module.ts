import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import {LogSharedModule} from '../../../entities/log-shared/log-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LogSharedModule,
    LogRoutingModule
  ]
})
export class LogModule { }
