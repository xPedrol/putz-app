import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {SharedService} from '../../../shared/shared.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  submitted = false;
  newPasswordForm: FormGroup;
  showPassword = false;
  showCPassword = false;
  subject$ = new Subject();

  constructor(
    private authService: AuthService,
    private toastService: NbToastrService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private sharedService: SharedService
  ) {
    this.sharedService.setPageData('Nova senha');
    this.newPasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      // @ts-ignore
      confirmPassword: new FormControl(null, [Validators.required, this.passwordValidation])
    });
  }

  ngOnInit(): void {

  }

  newPassword(): void {
    const key = this.activatedRoute.snapshot.queryParams?.key;
    if (this.newPasswordForm.invalid) {
      this.newPasswordForm.markAllAsTouched();
    }
    if (this.newPasswordForm.valid && key) {
      this.authService.newPassword(key, this.newPasswordForm.get('password')!.value).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.route.navigateByUrl('/auth/login');
        this.toastService.show('', 'Atualizado com sucesso', {status: 'success'});
      });
    }
  }

  passwordValidation = (confirmPassword: FormControl): any => {
    if (this.newPasswordForm) {
      if (confirmPassword.value !== this.newPasswordForm.get('password')?.value) {
        return {
          passwordCheck: true
        };
      }
    }
    return null;
  };
}
