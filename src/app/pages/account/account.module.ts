import {NgModule} from '@angular/core';
import {ProfileComponent} from '../../entities/account-shared/profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {AccountSharedModule} from '../../entities/account-shared/account-shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile/:userLogin',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    AccountSharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule {
}
