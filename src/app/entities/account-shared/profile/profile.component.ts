import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation} from '@angular/core';
import {combineLatest, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import {Authority} from '../../../constants/authority.constants';
import {AccountService} from '../../../services/account.service';
import {IPerson} from '../../../models/person.model';
import {SharedService} from '../../../shared/shared.service';
import {PersonService} from '../../../services/person.service';
import {isPlatformBrowser} from "@angular/common";
import {DATE_FORMAT} from "../../../config/input.constants";
import {EditPersonComponent} from "../edit-person/edit-person.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.scss',
    '../../../shared/themes/common.scss',
    '../../../shared/themes/nebular-overrides.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('editPersonComponent', {static: false}) editPersonComponent: EditPersonComponent | undefined;
  imgProfile: string = '';
  subject$ = new Subject();
  person: IPerson | undefined;
  loadingUser = true;
  userLogin: string | undefined;
  authorities: Authority[] | undefined;
  isBrowser;
  canVerifyNumber: boolean;

  constructor(
    private accountService: AccountService,
    private dialogService: NbDialogService,
    public sharedService: SharedService,
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private toastService: NbToastrService,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.sharedService.setPageData('Perfil');
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.data
    ]).subscribe(res => {
      const params = res[0] ?? {};
      const data = res[1] ?? {};
      this.userLogin = params?.userLogin;
      this.authorities = data?.authorities;
      if (this.userLogin) {
        this.sharedService.setPageData(`Perfil (${this.userLogin})`);
        this.getForeignUser();
      } else {
        this.getOwnUser();
      }
    });
    this.accountService.accountSubject.subscribe(account => {
      this.canVerifyNumber = !account.hasOnlyAuthority([Authority.AGENCY]);
    });
  }

  handlePerson(): void {
    const person = this.editPersonComponent.validateAndGetRaw();
    if (person) {
      this.save(person);
    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  getForeignUser(): void {
    if (this.userLogin) {
      this.setUser(this.personService.find(this.userLogin));
    }
  }


  getOwnUser(): void {
    this.setUser(this.personService.getPersonByAccount());
  }


  getAccount(): void {
    this.accountService.getAccount(true).pipe(takeUntil(this.subject$)).subscribe();
  }


  setUser(userObservable: Observable<IPerson>): void {
    this.loadingUser = true;
    userObservable.pipe(takeUntil(this.subject$)).subscribe({
      next: user => {
        this.imgProfile = `background-image: url(${user?.avatar});`;
        this.person = user as IPerson;
      }
    }).add(() => this.loadingUser = false);
  }

  verifyPhoneWhatsapp(): void {
    if (this.isBrowser && this.person?.birthday && this.canVerifyNumber) {
      const phoneWhatsapp = this.person?.phoneWhatsapp;
      window.open(`https://api.whatsapp.com/send?phone=+551140402001&text=${this.person.birthday.format(DATE_FORMAT)}`, '_blank');
      // https://api.whatsapp.com/send/?phone={{renderItem?.renderProject?.whatsappBot}}&text={{renderItem?.renderUid | empty}}
    }
  }

  save(person: IPerson): void {
    this.personService.savePerson(person).subscribe(() => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
      this.getOwnUser();
      this.getAccount();
    });
  }

  savePhoto(photo: any): void {
    this.personService.personImageUpload(photo).subscribe(() => {
      this.toastService.show('', 'Imagem atualizada', {status: 'success'});
      this.getOwnUser();
      this.getAccount();
    });
  }

  updatePassword(passwords: any): void {
    this.accountService.changePassword(passwords).subscribe(() => {
      this.toastService.show('', 'Salvo com sucesso', {status: 'success'});
    });
  }
}
