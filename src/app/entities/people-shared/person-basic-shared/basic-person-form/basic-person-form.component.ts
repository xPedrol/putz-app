import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {personTypes} from '../../../../constants/person-type.constants';
import {AuthService} from "../../../../services/auth.service";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-basic-person-form',
  templateUrl: './basic-person-form.component.html',
  styleUrls: ['./basic-person-form.component.scss']
})
export class BasicPersonFormComponent implements OnInit {
  editForm: FormGroup;
  personTypes = personTypes;
  validatingLogin: boolean;
  loginIsAvailable: boolean = true;

  constructor(
    private authService: AuthService
  ) {
    this.editForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(512)]),
      slug: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(512), this.cannotContainSpace]),
      personType: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.editForm.get('slug')?.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value && value !== '') {
        this.validatingLogin = true;
        this.authService.validateLogin(value).subscribe(isValid => {
          this.loginIsAvailable = !isValid;
        }).add(() => this.validatingLogin = false);
      } else {
        this.loginIsAvailable = true;
      }
    });
  }

  getFormData(): any {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return null;
    } else {
      return this.editForm.getRawValue();
    }
  }

  cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if (control && control?.value) {
      if ((control.value as string).indexOf(' ') >= 0) {
        return {cannotContainSpace: true};
      }
    }
    return null;
  }
}
