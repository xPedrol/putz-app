import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {NbAuthModule} from '@nebular/auth';
import {RegisterComponent} from './register/register.component';
import {PasswordRequestResetComponent} from './password-request-reset/password-request-reset.component';
import {NewPasswordComponent} from './new-password/new-password.component';
import {AuthBaseComponent} from './auth-base/auth-base.component';
import {SharedModule} from '../../shared/shared.module';
import {ActivateUserRequestComponent} from './activate-user-request/activate-user-request.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'password/request',
    component: PasswordRequestResetComponent, // <---
  },
  {
    path: 'password/new',
    component: NewPasswordComponent, // <---
  },
  {
    path: 'activate',
    component: ActivateUserRequestComponent, // <---
  },
  {
    path: 'oauth2/callback',
    loadChildren: () => import('./oauth2/callback/callback.module').then(m => m.CallbackModule)
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordRequestResetComponent,
    NewPasswordComponent,
    AuthBaseComponent,
    ActivateUserRequestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NbAuthModule
  ]
})
export class AuthModule {
}
