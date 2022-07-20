import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicPersonDialogComponent} from './basic-person-dialog/basic-person-dialog.component';
import {BasicPersonFormComponent} from './basic-person-form/basic-person-form.component';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    BasicPersonFormComponent,
    BasicPersonDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    BasicPersonFormComponent,
    BasicPersonDialogComponent
  ]
})
export class PersonBasicSharedModule {
}
