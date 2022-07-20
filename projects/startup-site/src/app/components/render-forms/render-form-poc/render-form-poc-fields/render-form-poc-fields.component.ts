import {Component, OnInit} from '@angular/core';
import {ExternalApisService} from '../../../../../../../../src/app/services/external-apis.service';
import {ProjectRenderItemService} from '../../../../../../../../src/app/services/project-render-item.service';
import {ProjectService} from '../../../../../../../../src/app/services/project.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {RenderBaseFormComponent} from '../../../render-forms-config/render-base-form/render-base-form.component';
import {ufs} from '../../../../../../../../src/app/constants/ufs.constants';
import {GeoLocationService} from '../../../../services/geo-location.service';

@Component({
  selector: 'app-render-form-poc-fields',
  templateUrl: './render-form-poc-fields.component.html',
  styleUrls: ['./render-form-poc-fields.component.scss']
})
export class RenderFormPocFieldsComponent extends RenderBaseFormComponent implements OnInit {


  counties: any[] | undefined;
  ufs = ufs;
  formSlug = 'poc';
  fieldsForValidation = ['name'];
  useCountryMask = true;

  constructor(
    private externalService: ExternalApisService,
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
    public geoLocationService: GeoLocationService
  ) {
    super(projectService, projectRenderItemService, geoLocationService);
    this.uploadForm = new FormGroup({
      country: new FormControl(this.defaultCountryDialCode, [Validators.required]),
      whatsapp: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      warranty: new FormControl('', [Validators.required]),
      loanValue: new FormControl('', [Validators.required]),
      rate: new FormControl('', [Validators.required]),
      portionValue: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      city: new FormControl({value: '', disabled: true}, [Validators.required]),
      uf: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.location$.subscribe(location => {
      if (location) {
        const country = this.getCountyByCode(location.country_code);
        if (country) {
          this.uploadForm.get('country').setValue(country.dial_code);
          this.uploadForm.get('city').setValue(location.town);
          this.uploadForm.get('uf').setValue(location.uf);
        }
      }
    });
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    form.whatsapp = form.country + form.whatsapp;
    // console.warn(form);
    // form.whatsapp = Number(Number(form.country.replace(/ /g, '')) + form.whatsapp);
    form.country = undefined;
    return form;
  }

  autoComplete(): void {
    this.uploadForm.reset({
      city: 'Timoteo',
      uf: 'MG',
      date: 15,
      loanValue: '50Mil',
      rate: '0,99%',
      portionValue: '2Mil',
      warranty: 'VEICULO',
      name: 'ANA',
      reason: 'VIAGEM',
      country: '+55'
    });
  }

  uFChange(): void {
    if (this.uploadForm.get('uf')?.value) {
      this.externalService.getCountiesByUF(this.uploadForm.get('uf')?.value).pipe(takeUntil(this.subject$)).subscribe(counties => {
        this.counties = counties;
        this.uploadForm.get('city')?.enable();
      });
    }
  }


}
