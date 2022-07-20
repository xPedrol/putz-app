import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {CookieBackendModule} from '../../../../src/app/core/cookie/server/cookie-backend.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {translateServerLoaderFactory} from '../../../../src/app/core/translate/translate-server.loader';
import {TransferState} from '@angular/platform-browser';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    CookieBackendModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    })
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
