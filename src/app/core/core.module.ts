import {DEFAULT_CURRENCY_CODE, LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {RoleProvider} from './utils/role-provider';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {ErrorHandlerInterceptor} from './interceptor/error-handler.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgxMaskModule} from 'ngx-mask';
import {accessPermissions} from './access-permissions';
import {translateBrowserLoaderFactory} from './translate/translate-browser.loader';
import {TransferState} from '@angular/platform-browser';
import {
  NbAuthJWTInterceptor,
  NbAuthModule,
  // NbOAuth2AuthStrategy,
  // NbOAuth2ResponseType,
  NbPasswordAuthStrategy,
  NbTokenStorage
} from '@nebular/auth';
import {TokenCookieStorageService} from '../services/token-cookie-storage.service';
import {MainStrategy} from './strategies/main.strategy';
import localePt from '@angular/common/locales/pt';
import {SidebarService} from '../services/sidebar.service';
import {APP_CONFIG} from './Injection-tokens/app-config.injection-token';
import {IAppConfig} from '../models/config/app-config.model';

registerLocaleData(localePt, 'pt-BR');

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
        // NbOAuth2AuthStrategy.setup({
        //   name: 'github',
        //   clientId: '75c48c266ff2b0b759be',
        //   clientSecret: '',
        //   authorize: {
        //     endpoint: 'https://github.com/login/oauth/authorize',
        //     responseType: NbOAuth2ResponseType.TOKEN,
        //     scope: 'user',
        //     redirectUri: 'http://localhost:4200/auth/oauth2/callback/github'
        //   }
        // }),
        // NbOAuth2AuthStrategy.setup({
        //   name: 'google',
        //   clientId: '352935505172-p6ej5tmuvkc6n6jngnha2s27n1d1in8o.apps.googleusercontent.com',
        //   clientSecret: '',
        //   authorize: {
        //     endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        //     responseType: NbOAuth2ResponseType.TOKEN,
        //     scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        //     redirectUri: 'http://localhost:4200/auth/oauth2/callback/google'
        //   }
        // }),
        // NbOAuth2AuthStrategy.setup(GoogleStrategy),
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
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      },
      extend: true
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
