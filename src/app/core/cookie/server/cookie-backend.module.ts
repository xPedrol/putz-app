import { ModuleWithProviders, NgModule } from '@angular/core';

import { CookieBackendWriterService } from './cookie-backend-writer.service';
import {CookieModule} from '../browser/cookie.module';
import {CookieOptionsProvider} from '../browser/cookie-options.provider';
import {CookieOptions} from '../browser/cookie.model';
import {COOKIE_OPTIONS, COOKIE_WRITER} from '../browser/tokens';


@NgModule({
  imports: [CookieModule],
  providers: [CookieOptionsProvider]
})
export class CookieBackendModule {
  /**
   * Use this method in your root module to provide the CookieService
   */
  static forRoot(options: CookieOptions = {}): ModuleWithProviders<CookieModule> {
    return {
      ngModule: CookieModule,
      providers: [
        {provide: COOKIE_OPTIONS, useValue: options},
        {provide: COOKIE_WRITER, useClass: CookieBackendWriterService}
      ]
    };
  }

  /**
   * Use this method in your other (non root) modules to import the directive/pipe
   */
  static forChild(options: CookieOptions = {}): ModuleWithProviders<CookieModule> {
    return CookieBackendModule.forRoot(options);
  }
}
