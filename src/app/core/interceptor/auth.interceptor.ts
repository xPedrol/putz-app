import {Inject, Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NB_AUTH_TOKEN_INTERCEPTOR_FILTER, NbAuthService, NbAuthToken} from '@nebular/auth';
import {switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    @Inject(NB_AUTH_TOKEN_INTERCEPTOR_FILTER) protected filter: any
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do not intercept request whose urls are filtered by the injected filter
    // if (!this.filter(req)) {
      return this.nbAuthService.isAuthenticated()
        .pipe(
          switchMap(authenticated => {
            if (authenticated && req.url.includes(environment.API_URL_CONFIG)) {
              return this.nbAuthService.getToken().pipe(
                switchMap((token: NbAuthToken) => {
                  const JWT = `Bearer ${token.getValue()}`;
                  req = req.clone({
                    setHeaders: {
                      Authorization: JWT
                    },
                  });
                  return next.handle(req);
                }),
              );
            } else {
              // Request is sent to server without authentication so that the browser code
              // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
              return next.handle(req);
            }
          })
          // , catchError(() => {
          //   return next.handle(req);
          // })
        );
    // } else {
    //   return next.handle(req);
    // }
  }


  protected get nbAuthService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }
}
