import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import {PersonSharedModule} from '../../entities/people-shared/person-shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PersonSharedModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
