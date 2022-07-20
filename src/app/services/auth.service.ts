import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {IUserAuth} from '../models/UserLogin.model';
import {catchError, map} from 'rxjs/operators';
import * as moment from 'moment';
import {MiddlewareCookieService} from './middleware-cookie.service';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {AccountService} from './account.service';
import {environment} from '../../environments/environment';
import {IJwtUser} from '../models/jwt-user.model';
import {NbAuthService} from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: MiddlewareCookieService,
    private router: Router,
    private localStorage: LocalStorageService,
    private accountService: AccountService,
    private nbAuthService: NbAuthService,
  ) {
  }

  login(user: IUserAuth, rememberMe: boolean = false): Observable<boolean> {
    return this.http.post<any>(`${environment.API_URL}authenticate`, user).pipe(
      catchError(() => {
        return of(false);
      }),
      map((obj: any) => {
        if (obj?.id_token) {
          const date = rememberMe ? new Date(moment().add(1, 'months').format('YYYY-MM-DD')) : null;
          this.cookieService.putCookie('id_token', obj?.id_token, date);
          return true;
        } else {
          return false;
        }
      }));
  }

  logout(navigate: boolean = true): void {
    // this.nbAuthService.logout('main').subscribe(result => {
    //   console.warn(result);
    //
    // });
    this.cookieService.removeCookie('putz_auth_token');
    this.cookieService.removeCookie('access-permission');
    this.localStorage.clear('url_back');
    this.accountService.clearAccount();
    if (navigate) {
      this.router.navigateByUrl('/auth/login');
    }

  }

  register(user: IUserAuth): Observable<boolean> {
    return this.http.post<boolean>(`${environment.API_URL}register`, user);
  }

  requestPassword(email: string): Observable<{}> {
    return this.http.post(environment.API_URL + 'account/reset-password/init', email);
  }

  activateUser(email: string): Observable<{}> {
    // const formData = new FormData();
    // formData.append('key', email);
    return this.http.get(environment.API_URL + 'activate', {params: {key: email}});
  }

  newPassword(key: string, newPassword: string): Observable<{}> {
    return this.http.post(environment.API_URL + 'account/reset-password/finish', {key, newPassword});
  }

  validateLogin(login: string): Observable<boolean> {
    return this.http.get<boolean>(environment.API_URL + `public/users/${login}`);
  }


  redirectIfLoggedIn(): void {
    this.accountService.getAccount(true).subscribe(account => {
      if (account) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  verifyToken(jwtUser: IJwtUser): boolean {
    if (jwtUser) {
      return moment(jwtUser.exp).isAfter(moment().unix());
    }
    return false;
  }
}
