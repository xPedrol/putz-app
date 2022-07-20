import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IPerson} from '../../../models/person.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../../../services/person.service';
import {NbToastrService} from '@nebular/theme';
import {NbAccessChecker} from '@nebular/security';
import {combineLatest, Subject} from 'rxjs';
import {UserService} from '../../../services/user.service';
import {IUser} from '../../../models/user.model';
import {EditPersonComponent} from '../../account-shared/edit-person/edit-person.component';
import {UserFormComponent} from '../../user-shared/user-form/user-form.component';
import {HeadService} from '../../../services/head.service';
import {takeUntil} from 'rxjs/operators';
import {DATE_FORMAT} from "../../../config/input.constants";
import {PersonType} from "../../../models/enums/person-type.model";

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss'],
  providers: [
    PersonService,
    UserService
  ]
})
export class PeopleDetailComponent implements OnInit, OnDestroy {
  @ViewChild('editPersonComponent', {static: false}) editPersonComponent: EditPersonComponent | undefined;
  @ViewChild('userFormComponent', {static: false}) userFormComponent: UserFormComponent | undefined;
  personLogin: string | undefined;
  person: IPerson | undefined;
  user: any | undefined;
  subject$: Subject<any>;
  personType = PersonType;
  constructor(
    private personService: PersonService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastService: NbToastrService,
    private router: Router,
    private accessCheck: NbAccessChecker,
    private headService: HeadService
  ) {
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    combineLatest([
      this.accessCheck.isGranted('view', 'advanced-browser'),
      this.activatedRoute.params
    ]).pipe(takeUntil(this.subject$)).subscribe(([hasAdvancedAccess, params]) => {
      this.personLogin = params?.personLogin !== 'new' ? params?.personLogin : undefined;
      if (this.personLogin) {
        if (hasAdvancedAccess) {
          this.getUser();
        } else {
        }
        this.getPerson();
      } else {
        this.headService.setTitle(`Novo cliente`);
      }
    });
  }

  getPerson(): void {
    if (this.personLogin) {
      this.personService.getPerson(this.personLogin).pipe(takeUntil(this.subject$)).subscribe({
        next: person => {
          if (person) {
            this.person = person;
            this.headService.setTitle(`${this.person?.name}`);
          }
        },
        error: () => {
          if (this.editPersonComponent) {
            this.editPersonComponent.profileForm.reset();
          }
        }
      });
    }
  }

  getUser(): void {
    if (this.personLogin) {
      this.userService.find(this.personLogin).pipe(takeUntil(this.subject$)).subscribe({
        next: user => {
          if (user) {
            this.user = user;
          }
        },
        error: () => {
          if (this.userFormComponent) {
            this.userFormComponent.profileForm.reset();
          }
        }
      });
    }
  }

  copyPhoneWhatsappVerifyLinkToClipboard(): void {
    if (this.person?.birthday) {
      navigator.clipboard.writeText(`https://api.whatsapp.com/send?phone=+551140402001&text=${this.person.birthday.format(DATE_FORMAT)}`);
      this.toastService.show('', 'Link copiado para a área de transferência', {status: 'success'});
    } else {
      this.toastService.show('Data de aniversário precisa estar preenchida', 'Não foi possível copiar o link', {status: 'danger'});
    }
  }

  handlePerson(): void {
    const person = this.editPersonComponent.validateAndGetRaw();
    if (person) {
      this.savePerson(person);
    }
  }

  savePerson(person: IPerson): void {
    let request;
    if (this.personLogin && this.person) {
      request = this.personService.update(person, this.personLogin);
    } else {
      request = this.personService.create(person);
    }
    request.pipe(takeUntil(this.subject$)).subscribe({
      next: person => {
        this.toastService.show('', `Usuário ${person?.name ?? '---'} salvo com sucesso`, {status: 'success'});
        if (!this.personLogin) {
          this.router.navigateByUrl(`/people/${person?.name}`).then();
        } else {
          this.getParams();
        }
      }
    });
  }


  saveUser(person: IUser): void {
    // let request;
    // if (this.personLogin && this.user) {
    //   request = this.userService.update(person);
    // }
    // else {
    //   request = this.personService.create(person);
    // }
    if (this.personLogin && this.user) {
      this.userService.update(person).pipe(takeUntil(this.subject$)).subscribe(person => {
        this.toastService.show('', `Usuário ${person?.firstName ?? '---'} salvo com sucesso`, {status: 'success'});
        if (!this.personLogin) {
          this.router.navigateByUrl(`/people/${person?.login}`).then();
        } else {
          this.getParams();
        }
      });
    }
  }

  savePicture(photo: any): void {
    if (this.personLogin && this.person) {
      this.personService.personImageUploadBySlug(photo, this.personLogin).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Imagem atualizada', {status: 'success'});
      });
    }
  }

  updatePassword(passwords: any): void {
    if (this.person?.slug) {
      this.userService.changePasswordByAdmin(this.person?.slug, passwords).pipe(takeUntil(this.subject$)).subscribe(() => {
        this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      });
    }
  }

  ngOnDestroy(): void {
    this.personService.clearPerson();
    this.subject$.next(null);
    this.subject$.complete();
  }


}
