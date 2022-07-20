import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// import {TabsModule} from 'ngx-tabset';
// import {AccordionModule} from 'ngx-accordion';
import {StickyNavModule} from 'ng2-sticky-nav';
// import {NgxScrollTopModule} from 'ngx-scrolltop';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {NgxSmartModalModule} from 'ngx-smart-modal';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {FooterComponent} from './layouts/footer/footer.component';

import {CurrencyPipe, PercentPipe} from '@angular/common';
import {MenuSiteService} from './services/menu-site.service';
import {ToastContainerComponent} from "./layouts/toast/toast-container.component";
import {StartupAuthInterceptor} from "./layouts/interceptors/startup-auth.interceptor";
import {NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieModule} from '../../../../src/app/core/cookie/browser/cookie.module';


// import {CommonStartupModule} from './common/common-startup.module';
// import {PagesDemoModule} from './components/pages-demo/pages-demo.module';
// import {NgxWebstorageModule} from 'ngx-webstorage';
// import {PipeModule} from '../../../../src/app/core/pipes/pipe.module';

// import {CoreModule} from './core/core.module';
// import {PagesModule} from './components/pages/pages.module';
// import {CommonNebulaModule} from './common/common-nebula.module';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ToastContainerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CookieModule.forRoot(),
    NgbModule,
    NgbNavModule,
    CarouselModule,
    NgxSmartModalModule.forRoot(),
    StickyNavModule,

    // NgxWebstorageModule.forRoot(),
    // NgxScrollTopModule,
    // TabsModule.forRoot(),
    // AccordionModule,
    // CommonStartupModule,
    // PipeModule,
    // CoreModule,
    // HotsitesModule
  ],
  providers: [
    PercentPipe,
    CurrencyPipe,
    MenuSiteService,
    {provide: HTTP_INTERCEPTORS, useClass: StartupAuthInterceptor, multi: true}
  ],
  exports: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
