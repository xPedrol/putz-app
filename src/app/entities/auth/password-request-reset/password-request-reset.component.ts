import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {SharedService} from '../../../shared/shared.service';

@Component({
  selector: 'app-password-request-reset',
  templateUrl: './password-request-reset.component.html',
  styleUrls: ['./password-request-reset.component.scss']
})
export class PasswordRequestResetComponent implements OnInit {
  requestPForm: FormGroup;
  submitted = false;
  subject = new Subject();
  success: boolean | null = null;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.sharedService.setPageData('Recuperar senha');
    this.requestPForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {

  }

  requestReset(): void {
    if (this.requestPForm.invalid) {
      this.requestPForm.markAllAsTouched();
    }
    if (this.requestPForm.valid) {
      this.submitted = true;
      this.authService.requestPassword(this.requestPForm.get('email')!.value)
        .pipe(takeUntil(this.subject)).subscribe(() => {
        this.submitted = false;
        this.success = true;
        this.requestPForm.reset();
      }, () => {
        this.submitted = false;
        this.success = false;
      });
    }
  }

}
