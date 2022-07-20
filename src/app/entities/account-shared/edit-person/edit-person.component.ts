import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {IPerson} from '../../../models/person.model';
import {genders} from '../../../constants/gender.constants';
import {personTypes} from '../../../constants/person-type.constants';
import {ExternalApisService} from '../../../services/external-apis.service';
import {debounceTime, skip, startWith} from 'rxjs/operators';
import {IViacepAddress} from '../../../models/external/viacepAddress.model';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../../services/person.service';
import {PersonType} from '../../../models/enums/person-type.model';
import {IPersonBasic} from '../../../models/basics/person.basic';
import {PersonReferenceArray} from '../../../constants/person-reference.constants';
import {ufs} from '../../../constants/ufs.constants';
import {
  countryCodes,
  countryMasks,
  findCountyByCode,
  findCountyByDialCode,
  profileCountryCodes
} from "../../../constants/country-codes.constants";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss', '../../../shared/themes/common.scss']
})
export class EditPersonComponent implements OnInit {

  agencySearch: FormControl;
  profileForm: FormGroup;
  photo: File | undefined;
  genders = genders;
  ufs = ufs;
  personTypes = personTypes;
  countryCodes = countryCodes;
  countryMasks = countryMasks;
  person: IPerson | undefined;
  isJuridic = false;
  agencies: IPersonBasic[] | undefined;
  personLogin: string | undefined;
  references = PersonReferenceArray;
  phoneMask: string = '0*';

  constructor(
    private userService: PersonService,
    private toastService: NbToastrService,
    private externalApisService: ExternalApisService,
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
  ) {
    this.agencySearch = new FormControl();
    this.profileForm = new FormGroup({
      id: new FormControl(null),
      slug: new FormControl({value: null, disabled: true}, [Validators.required]),
      name: new FormControl({value: null}, []),
      birthday: new FormControl(null, []),
      email: new FormControl(null, [Validators.email]),
      personType: new FormControl(null, []),
      gender: new FormControl(null, []),
      nameFantasy: new FormControl(null, []),
      ddi: new FormControl('', [Validators.required]),
      phone: new FormControl(null, []),
      phoneCel: new FormControl(null, []),
      phoneWhatsapp: new FormControl(null, []),
      cpfCNPF: new FormControl(null, []),
      rgDoc: new FormControl(null, []),
      // Validators.minLength(8), Validators.maxLength(8)
      addressZipCode: new FormControl(null, []),
      addressDistrict: new FormControl(null, []),
      addressNumber: new FormControl(null, []),
      addressUf: new FormControl(null, []),
      addressCountry: new FormControl(null, [Validators.required]),
      addressComplement: new FormControl(null, []),
      addressCity: new FormControl(null, []),
      companyId: new FormControl(null, []),
      reference: new FormControl(null, []),
      phoneWhatsappVerification: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    this.getAgencies();
    this.activatedRoute.params.subscribe(params => {
      this.personLogin = params?.personLogin !== 'new' ? params?.personLogin : undefined;
      if (!this.personLogin) {
        this.profileForm.get('slug')?.enable();
      }
    });
    this.agencySearch.valueChanges
      .pipe(startWith(''), debounceTime(400), skip(1)).subscribe((value) => {
      if (typeof value === 'string') {
        this.profileForm.get('companyId')?.reset();
        this.getAgencies(value);
      } else if (value && typeof value !== 'string') {
        this.profileForm.get('companyId')?.setValue(value?.id);
        this.agencySearch.setValue(value, {emitEvent: false, emitModelToViewChange: false});
      }
    });
    this.profileForm.get('personType')?.valueChanges.subscribe(value => {
      this.isJuridic = PersonType.J === value;
    });
    this.userService.person$.subscribe(person => {
      this.person = person ?? undefined;
      this.updateForm();
    });
    this.profileForm.get('addressZipCode')?.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      if (this.profileForm.get('addressZipCode')!.valid && value) {
        this.externalApisService.getAddressByCEP(value).subscribe((data: IViacepAddress | any) => {
          if (data && !data?.erro) {
            this.profileForm.patchValue({
              addressUf: data.uf,
              addressCity: data.localidade,
              addressDistrict: data.bairro

            });
          } else if (data?.erro) {
            this.toastService.show('', 'CEP não encontrado', {status: 'danger'});
          }
        });
      }

    });

    this.profileForm.get('ddi')?.valueChanges.subscribe(value => {
      if (value) {
        this.countryChange(value);
      }
    });


  }


  getAgencies(searchValue?: string): void {
    searchValue = searchValue ?? '';
    this.personService.query('AGENCY', {page: 0, size: 10, search: searchValue}).pipe().subscribe(({people}) => {
      if (people) {
        this.agencies = people;
      }
    });
  }

  viewAgencyHandle(value: string | IPersonBasic): string {
    if (typeof value === 'string') {
      return value;
    } else {
      return value?.name ?? '';
    }
  }

  validateAndGetRaw() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
    }
    if (this.profileForm.valid) {
      return this.getFromForm();
    }
    return null;
  }

  getFromForm(): any {
    const person: IPerson | any = {...this.person, ...this.profileForm.getRawValue()};
    const addDDI = (string) => `${person.ddi}${string}`;
    person.phone = addDDI(person.phone);
    person.phoneCel = addDDI(person.phoneCel);
    person.phoneWhatsapp = addDDI(person.phoneWhatsapp);
    person.company = this.agencySearch.value?.id ? {id: this.agencySearch.value?.id} : undefined;
    delete person.ddi;
    // person.addressCountry = this.selectedCountry?.code ?? null;
    delete person.companyId;
    delete person.phoneWhatsappVerification;
    return person;
  }

  updateForm() {
    const replace = (string => {
      if (string) {
        string = string.replace(/\s/g, '').replace('-', '').replace('(', '').replace(')', '').replace('+', '');
        if (this.person.phoneWhatsappDetail?.countryCode) {
          string = string.replace(this.person.phoneWhatsappDetail.countryCode, '');
        }
      }
      return string;
    });
    this.profileForm.get('id')?.setValue(this.person?.id);
    this.profileForm.get('slug')?.setValue(this.person?.slug);
    this.profileForm.get('name')?.setValue(this.person?.name);
    this.profileForm.get('birthday')?.setValue(this.person?.birthday);
    this.profileForm.get('email')?.setValue(this.person?.email);
    this.profileForm.get('personType')?.setValue(this.person?.personType);
    this.profileForm.get('gender')?.setValue(this.person?.gender);
    this.profileForm.get('nameFantasy')?.setValue(this.person?.nameFantasy);
    let dialCode = this.person?.phoneWhatsappDetail?.countryCode as unknown as string;
    if (dialCode) {
      dialCode = `+${dialCode}`;
      this.profileForm.get('ddi')?.setValue(dialCode);
      this.countryMasks[findCountyByDialCode(dialCode).code];
      this.changePhoneMask(dialCode);
    }
    this.profileForm.get('phone')?.setValue(replace(this.person?.phone));
    this.profileForm.get('phoneCel')?.setValue(replace(this.person?.phoneCel));
    this.profileForm.get('phoneWhatsapp')?.setValue(replace(this.person?.phoneWhatsapp));
    this.profileForm.get('cpfCNPF')?.setValue(this.person?.cpfCNPF);
    this.profileForm.get('rgDoc')?.setValue(this.person?.rgDoc);
    this.profileForm.get('phoneWhatsappVerification')?.setValue(this.person?.phoneWhatsappVerification);

    this.profileForm.get('addressCity')?.setValue(this.person?.addressCity);
    this.profileForm.get('addressComplement')?.setValue(this.person?.addressComplement);
    this.profileForm.get('addressCountry')?.setValue(this.person?.addressCountry);
    this.profileForm.get('addressUf')?.setValue(this.person?.addressUf);
    this.profileForm.get('addressNumber')?.setValue(this.person?.addressNumber);
    this.profileForm.get('addressDistrict')?.setValue(this.person?.addressDistrict);
    this.profileForm.get('addressZipCode')?.setValue(this.person?.addressZipCode, {emitEvent: false});
    this.profileForm.get('companyId')?.setValue(this.person?.company?.id);
    this.profileForm.get('reference')?.setValue(this.person?.reference);
    this.agencySearch.setValue(this.person?.company, {emitEvent: false});

  }

  countryChange(dialCode: any): void {
    this.profileForm.get('phoneCel')?.reset();
    this.profileForm.get('phoneWhatsapp')?.reset();
    this.profileForm.get('phone')?.reset();

    this.changePhoneMask(dialCode);
  }

  changePhoneMask(dialCode: string) {
    const mask = this.countryMasks[findCountyByDialCode(dialCode).code];
    if (mask) {
      this.phoneMask = mask;
    } else {
      this.phoneMask = '0*';
    }
  }

  onRemove() {
    this.photo = undefined;
  }

  trackAgenciesByFn(index: number, item: IPersonBasic) {
    return item.id;
  }

}
