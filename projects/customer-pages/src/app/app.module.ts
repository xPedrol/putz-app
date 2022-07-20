import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NbLayoutModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {PagesModule} from './pages/pages.module';
import {ThemesModule} from '../../../../src/app/shared/themes/themes.module';
import {HttpClientModule} from '@angular/common/http';
import {DashboardModule} from './entities/dashboard/dashboard.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {CookieModule} from '../../../../src/app/core/cookie/browser/cookie.module';
import {CoreModule} from '../../../../src/app/core/core.module';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {ComponentsModule} from '../../../../src/app/shared/components/components.module';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NgxWebstorageModule.forRoot(),
    CookieModule.forRoot(),
    CoreModule.forRoot({
      appId: 1,
      baseAppURL: environment.BASE_APP_URL
    }),
    ThemesModule,
    DashboardModule,
    AppRoutingModule,
    PagesModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
