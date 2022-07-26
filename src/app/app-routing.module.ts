import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoAuthGuard} from './core/interceptor/no-auth-guard.service';
import {allAuthorities} from './constants/authority.constants';
import {AuthGuard} from './core/interceptor/auth-guard.service';
import {ApiOfflineComponent} from './shared/components/api-offline/api-offline.component';
import {PageNotFoundComponent} from './shared/components/not-founds/page-not-found/page-not-found.component';
import {MainAppOneColumnLayoutComponent} from './shared/main-app-layout-page/main-app-one-column-layout/main-app-one-column-layout.component';
import {InvalidAccountComponent} from './shared/components/invalid-account/invalid-account.component';

const routes: Routes = [
  {
    path:'',
    component:MainAppOneColumnLayoutComponent,
    children:[
      // {
      //   path: '',
      //   redirectTo: 'auth/login',
      //   pathMatch: 'full'
      // },
      {
        path: 'auth',
        loadChildren: () => import('./entities/auth/auth.module').then(m => m.AuthModule),
        canActivate: [NoAuthGuard],
        data: {
          authorities: []
        }
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
        data: {
          authorities: allAuthorities
        },
        canActivate: [AuthGuard]
      },
      // {
      //   path: '',
      //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
      //   canActivate: [AuthGuard],
      //   data: {
      //     authorities: [Authority.ADMIN, Authority.CLIENT, Authority.FREELANCER]
      //   }
      // },
      {
        path: 'verify-account',
        component: InvalidAccountComponent
      },
      {
        path: '404',
        component: PageNotFoundComponent
      },
      {
        path: 'OFFLINESERVER',
        component: ApiOfflineComponent
      },
      // {
      //   path: 'about',
      //   component: StartupComponent
      // },
      {path: '**', redirectTo: '/404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
