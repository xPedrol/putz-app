import {DEFAULT_CURRENCY_CODE, LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {RoleProvider} from './utils/role-provider';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {ErrorHandlerInterceptor} from './interceptor/error-handler.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxMaskModule} from 'ngx-mask';
import {accessPermissions} from './access-permissions';
import {NbAuthJWTInterceptor, NbAuthModule, NbPasswordAuthStrategy, NbTokenStorage} from '@nebular/auth';
import {TokenCookieStorageService} from '../services/token-cookie-storage.service';
import {MainStrategy} from './strategies/main.strategy';
import localePt from '@angular/common/locales/pt';
import {SidebarService} from '../services/sidebar.service';
import {APP_CONFIG} from './Injection-tokens/app-config.injection-token';
import {IAppConfig} from '../models/config/app-config.model';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

registerLocaleData(localePt, 'pt-BR');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    CommonModule,
    NbSecurityModule.forRoot({
      accessControl: accessPermissions
    }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup(MainStrategy),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: false,
          },
        },
        register: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
      },
    }),
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    {
      provide: NbRoleProvider, useClass: RoleProvider,
    },
    {provide: NbTokenStorage, useClass: TokenCookieStorageService},
    SidebarService
  ]
})
export class CoreModule {

  static forRoot(config: IAppConfig): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: APP_CONFIG, useValue: config}
      ]
    };
  }
}
