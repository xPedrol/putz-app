import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {CookieService} from '../core/cookie/browser/cookie.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareCookieService {
  isProduction: boolean;
  baseOptions: any = {
    domain: environment.BASE_DOMAIN,
    sameSite: 'none',
    secure: true,
    path: '/'
  };

  constructor(
    private cookieService: CookieService,
  ) {
    this.isProduction = environment.production;
  }


  putCookie(key: string, value: any, date: any = null): void {
    if (Array.isArray(value)) {
      value = JSON.stringify(value);
    } else {
      value = String(value);
    }
    if (!date) {
      date = new Date(moment().add(5, 'years').format('YYYY-MM-DD'));
    }
    this.cookieService.put(key, value, {
      expires: date,
      ...this.baseOptions
    });
  }

  removeCookie(key: string): void {
    this.cookieService.remove(key, {
      // domain: this.env.getEnvironment.DOMAIN,
      ...this.baseOptions
    });
  }

  getCookie(key: string): any {
    return this.cookieService.get(key);
  }
}
