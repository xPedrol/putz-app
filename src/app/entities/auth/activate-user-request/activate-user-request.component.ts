import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {SharedService} from '../../../shared/shared.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-activate-user-request',
  templateUrl: './activate-user-request.component.html',
  styleUrls: ['./activate-user-request.component.scss']
})
export class ActivateUserRequestComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  subject = new Subject();
  success: boolean | null = null;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.sharedService.setPageData('Recuperar senha');
    this.formGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {

  }

  requestReset(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
    }
    if (this.formGroup.valid) {
      this.submitted = true;
      this.authService.activateUser(this.formGroup.get('email')!.value)
        .pipe(takeUntil(this.subject)).subscribe(() => {
        this.submitted = false;
        this.success = true;
        this.formGroup.reset();
      }, () => {
        this.submitted = false;
        this.success = false;
        this.formGroup.reset();
        this.formGroup.markAllAsTouched();
      });
    }
  }
}
