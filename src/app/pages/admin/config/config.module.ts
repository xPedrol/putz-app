import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import {ConfigSharedModule} from '../../../entities/config-shared/config-shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigSharedModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }
