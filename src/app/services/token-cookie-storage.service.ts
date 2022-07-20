import {Injectable} from '@angular/core';
import {NbAuthToken, NbAuthTokenParceler} from '@nebular/auth';
import {MiddlewareCookieService} from './middleware-cookie.service';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenCookieStorageService {

  protected key = environment.AUTH_TOKEN;

  constructor(
    private parceler: NbAuthTokenParceler,
    private cookieService: MiddlewareCookieService
  ) {
  }

  /**
   * Returns token from localStorage
   * @returns {NbAuthToken}
   */
  get(): NbAuthToken {
    const raw = this.cookieService.getCookie(this.key);
    return this.parceler.unwrap(raw);
  }

  /**
   * Sets token to localStorage
   * @param {NbAuthToken} token
   */
  set(token: NbAuthToken) {
    const raw = this.parceler.wrap(token);
    this.cookieService.putCookie(this.key, raw);
  }

  /**
   * Clears token from localStorage
   */
  clear() {
    this.cookieService.removeCookie(this.key);
  }
}
