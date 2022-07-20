import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../../../src/environments/environment";
import {MiddlewareCookieService} from "../../../../../../src/app/services/middleware-cookie.service";

@Injectable()
export class StartupAuthInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private cookieService: MiddlewareCookieService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do not intercept request whose urls are filtered by the injected filter
    // if (!this.filter(req)) {
    let token = this.cookieService.getCookie(environment.AUTH_TOKEN);
    if (token && req.url.includes(environment.API_URL_CONFIG)) {
      token = JSON.parse(token);
      const JWT = `Bearer ${token.value}`;
      req = req.clone({
        setHeaders: {
          Authorization: JWT
        },
      });
    }
    return next.handle(req);
  }
}
