import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import {SharedModule} from '../../shared/shared.module';
import {DirectivesModule} from '../../directives/directives.module';
import {PipeModule} from '../../core/pipes/pipe.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AccountSharedModule} from '../account-shared/account-shared.module';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    UserFormComponent
  ],
  exports: [
    UserFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectivesModule,
    PipeModule,
    ReactiveFormsModule,
    AccountSharedModule,
    RouterModule
  ]
})
export class UserSharedModule { }
