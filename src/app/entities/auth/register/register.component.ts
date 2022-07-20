import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {IUserAuth, UserAuth} from '../../../models/UserLogin.model';
import {authorities} from '../../../constants/authority.constants';
import {SharedService} from '../../../shared/shared.service';
import {handleFormErrors} from '../../../models/form/form-base.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  showPassword = false;
  showCPassword = false;
  registerForm: FormGroup;
  submitted = false;
  subject$: Subject<any>;
  authorities = authorities;
  validatingLogin: boolean;
  loginIsAvailable: boolean = true;

  constructor(
    private authService: AuthService,
    public router: Router,
    private toastService: NbToastrService,
    private sharedService: SharedService,
  ) {
    this.sharedService.setPageData('Cadastro');
    this.subject$ = new Subject<any>();
    this.registerForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      // @ts-ignore
      confirmPassword: new FormControl(null, [Validators.required, this.passwordValidation]),
      agreeTerms: new FormControl(false, []),
      authorities: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.registerForm.get('login')?.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe((value) => {
      if (value && value !== '') {
        this.validatingLogin = true;
        this.authService.validateLogin(value).subscribe(isValid => {
          this.loginIsAvailable = !isValid;
        }).add(() => this.validatingLogin = false);
      } else {
        this.loginIsAvailable = true;
      }
    });
    this.registerForm.get('password')?.valueChanges.pipe(debounceTime(600), takeUntil(this.subject$)).subscribe(value => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.submitted = true;
      this.authService
        .register(this.getUserFromForm()).pipe(takeUntil(this.subject$))
        .subscribe(
          {
            next: () => {
              this.toastService.show('', 'Registrado com sucesso', {status: 'success'});
              this.router.navigate(['/auth/login'], {queryParams: {justSignedUp: 'true'}});
            },
            error: (err) => handleFormErrors(this.registerForm, err),
          }
        ).add(() => this.submitted = false);
    }
  }

  getUserFromForm(): IUserAuth {
    const user: IUserAuth = new UserAuth();
    user.login = this.registerForm.get(['login'])!.value;
    user.email = this.registerForm.get(['email'])!.value;
    user.agreeTerms = this.registerForm.get(['agreeTerms'])!.value;
    user.password = this.registerForm.get(['password'])!.value;
    user.authorities = this.registerForm.get(['authorities'])!.value;
    // @ts-ignore
    user.langKey = 'pt-br';
    return user;
  }

  passwordValidation = (confirmPassword: FormControl): any => {
    if (this.registerForm) {
      if (confirmPassword.value !== this.registerForm.get('password')?.value) {
        return {
          passwordCheck: true
        };
      }
    }
    return null;
  };

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
