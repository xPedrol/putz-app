import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile/profile.component';
import {EditPersonComponent} from './edit-person/edit-person.component';
import {EditPasswordComponent} from './edit-password/edit-password.component';
import {EditProfileImageComponent} from './edit-profile-image/edit-profile-image.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {PipeModule} from '../../core/pipes/pipe.module';


@NgModule({
  declarations: [
    ProfileComponent,
    EditPersonComponent,
    EditPasswordComponent,
    EditProfileImageComponent
  ],
  exports: [
    ProfileComponent,
    EditPersonComponent,
    EditPasswordComponent,
    EditProfileImageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgxDropzoneModule,
    FormsModule,
    PipeModule
  ]
})
export class AccountSharedModule {
}
