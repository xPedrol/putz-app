import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AuthorityService} from '../../../services/authority.service';
import {NbTagComponent, NbTagInputDirective} from '@nebular/theme';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LANGUAGES} from '../../../constants/language.constants';
import {IUser} from '../../../models/user.model';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  authorities: string[] | undefined;
  profileForm: FormGroup;
  user: IUser | undefined;
  @ViewChild(NbTagInputDirective, {read: ElementRef}) tagInput: ElementRef<HTMLInputElement> | undefined;
  options: string[] = [];
  @Output() updateUser = new EventEmitter();
  languages = LANGUAGES;

  constructor(
    private authorityService: AuthorityService,
    private userService: UserService
  ) {
    this.profileForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, []),
      lastName: new FormControl(null, []),
      authorities: new FormControl(new Set<string>([]), [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      langKey: new FormControl(null, []),
      activated: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.userService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.updateForm();
      }
    });
    this.getAuthorities();
  }

  getAuthorities(): void {
    this.authorityService.query().subscribe(({authorities}) => {
      if (authorities) {
        this.authorities = authorities;
      }
    });
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.profileForm.get('authorities')?.value.delete(tagToRemove.text);
    this.options.push(tagToRemove.text);
  }

  onTagAdd(value: string): void {
    if (value) {
      this.profileForm.get('authorities')?.value.add(value);
      this.options = this.options.filter(o => o !== value);
    }
    if (this.tagInput)
      this.tagInput.nativeElement.value = '';
  }

  getFromForm(): IUser | any {
    const user: IUser | any = this.profileForm.getRawValue();
    return {
      id: user?.id ?? undefined,
      firstName: user?.firstName,
      lastName: user?.lastName,
      authorities: user?.authorities ? Array.from(user?.authorities) : undefined,
      langKey: user?.langKey,
      email: user?.email,
      login: this.user?.login,
      activated: user?.activated
    };
  }

  updateForm() {
    this.profileForm.patchValue({
      id: this.user?.id,
      authorities: new Set(this.user?.authorities ?? []),
      firstName: this.user?.firstName,
      lastName: this.user?.lastName,
      langKey: this.user?.langKey,
      email: this.user?.email,
      activated: this.user?.activated
    });
  }

  saveUser() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
    }
    if (this.profileForm.valid) {
      this.updateUser.emit(this.getFromForm());
    }
  }

}
