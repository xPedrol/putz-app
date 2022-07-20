import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {mergeMap} from 'rxjs/operators';
import {NbAuthService} from '@nebular/auth';
import {of} from 'rxjs';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private nbAuthService: NbAuthService,
  ) {
  }

  ngOnInit(): void {
    this.nbAuthService.getToken()
      .pipe(mergeMap((authToken) => {
        const token = authToken.getValue();
        if (token && this.authService.verifyToken(authToken.getPayload())) {
          return this.accountService.getAccount(true);
        } else {
          return of(null);
        }
      })).subscribe(account => {
      if (account) {
        this.router.navigateByUrl('/dashboard');
      }
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.authService.logout();
        this.router.navigateByUrl('/auth/login');
      }
      // else if (!error || error.status === 0 || error.status === 404) {
      //   console.warn('lugar certo');
      // }
    });
  }

}
