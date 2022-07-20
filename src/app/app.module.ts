import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {NbSecurityModule} from '@nebular/security';
import {CoreModule} from './core/core.module';
import {ThemesModule} from './shared/themes/themes.module';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {PagesModule} from './pages/pages.module';
import {CurrencyPipe, PercentPipe} from '@angular/common';
import {PipeModule} from './core/pipes/pipe.module';
import {NebularModule} from './shared/nebular-components/nebular.module';
import {CookieModule} from './core/cookie/browser/cookie.module';
import {environment} from '../environments/environment';
import {MainAppLayoutPageModule} from './shared/main-app-layout-page/main-app-layout-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    CookieModule.forRoot(),
    CoreModule.forRoot({appId: 0, baseAppURL: environment.BASE_APP_URL}),
    NbSecurityModule,
    NebularModule,
    ThemesModule,
    MainAppLayoutPageModule,
    PagesModule,
    AppRoutingModule,
    PipeModule,
  ],
  providers: [CurrencyPipe, PercentPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
