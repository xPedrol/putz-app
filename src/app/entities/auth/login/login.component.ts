import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../services/account.service';
import {LocalStorageService} from 'ngx-webstorage';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {IUserAuth, UserAuth} from '../../../models/UserLogin.model';
import {SharedService} from '../../../shared/shared.service';
import {environment} from '../../../../environments/environment';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {HttpErrorResponse} from '@angular/common/http';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  submitted = false;
  loginForm: FormGroup;
  showPassword = false;
  justSignedUp = false;
  subject$ = new Subject();
  isBrowser;
  isDevelopMode: boolean;

  constructor(
    private nbAuthService: NbAuthService,
    @Inject(PLATFORM_ID) platformId: string,
    public router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.sharedService.setPageData('Login');
    this.isBrowser = isPlatformBrowser(platformId);
    this.isDevelopMode = !environment.production;
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      rememberMe: new FormControl(null)
    });
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.justSignedUp = this.activatedRoute.snapshot.queryParams?.justSignedUp;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    if (this.loginForm.valid && this.isBrowser) {
      this.submitted = true;
      this.nebularLoginMainStrategy();
      // this.authService.login(this.getUserFromForm(), this.loginForm.get('rememberMe')!.value).pipe(takeUntil(this.subject$)).subscribe((account) => {
      //   if (this.isBrowser) {
      //     const urlBack: string = this.localStorageService.retrieve('url_back');
      //     if (urlBack) {
      //       this.router.navigateByUrl(`${urlBack}`);
      //       this.localStorageService.clear('url_back');
      //     } else {
      //       // console.warn(account);
      //       // if (this.env.getApplicationEnvironment().id !== 1 && !account.hasAnyAuthority([Authority.ADMIN])) {
      //       //   this.document.location.href = `https://app.mundodocodigo.com.br/${this.sharedService.routeAuthSwitch(account.authorities, true)}dashboard`;
      //       // }
      //       this.router.navigateByUrl(`/dashboard`);
      //     }
      //   }
      //   this.submitted = false;
      // }, () => {
      //   this.submitted = false;
      // });

    }
  }

  getUserFromForm(): IUserAuth {
    const user: IUserAuth = new UserAuth();
    user.username = this.loginForm.get('login')!.value;
    user.password = this.loginForm.get('password')!.value;
    if (environment.production) {
      user.rememberMe = true;
    }
    return user;
  }

  nebularLoginMainStrategy(): void {
    this.nbAuthService.authenticate('main', this.getUserFromForm()).pipe(takeUntil(this.subject$)).subscribe((result: NbAuthResult) => {
      if (result.isSuccess()) {
        const redirect = result.getRedirect();
        if (redirect) {
          this.router.navigateByUrl(redirect).then(() => {
            this.submitted = false;
          });
        }
      } else if (result.isFailure()) {
        this.loginForm.get('password')?.reset();
        this.submitted = false;
        const res: HttpErrorResponse = result.getResponse();
        if (String(res.error?.detail).includes('was not activated')) {
          this.router.navigateByUrl('/auth/activate');
        }
      }

    });
  }

  nebularLoginGoogleStrategy() {
    this.nbAuthService.authenticate('google')
      .pipe(takeUntil(this.subject$))
      .subscribe((authResult: NbAuthResult) => {
        console.warn(authResult);
      });
  }

  nebularLoginGithubStrategy() {
    this.nbAuthService.authenticate('github')
      .pipe(takeUntil(this.subject$))
      .subscribe((authResult: NbAuthResult) => {
        console.warn(authResult);
      });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
