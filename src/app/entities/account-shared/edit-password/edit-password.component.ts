import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../services/account.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  @Output() updatePassword = new EventEmitter();
  @Input() isAdmin = false;

  constructor(
    private accountService: AccountService,
    private toastService: NbToastrService
  ) {
    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      // @ts-ignore
      confirmPassword: new FormControl('', [Validators.required, this.passwordValidation])
    });
  }

  ngOnInit(): void {
  }

  savePassword() {
    const passwords = this.passwordForm.getRawValue();
    const valid = (passwords?.confirmPassword && passwords?.newPassword && passwords?.currentPassword && !this.isAdmin) ||
      (passwords?.confirmPassword && passwords?.newPassword && this.isAdmin);
    if (!valid) {
      this.passwordForm.markAllAsTouched();
    }
    if (valid) {
      // const person = {...this.user, ...this.profileForm.getRawValue()};

      passwords.confirmPassword = undefined;
      this.passwordForm.reset();
      this.updatePassword.emit(passwords);
    }
  }

  passwordValidation = (confirmPassword: FormControl): any => {
    if (this.passwordForm) {
      if (confirmPassword.value !== this.passwordForm.get('newPassword')?.value) {
        return {
          passwordCheck: true
        };
      }
    }
    return null;
  };

}
