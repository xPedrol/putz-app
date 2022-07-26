import {Component, ElementRef, OnInit} from '@angular/core';
import {ProjectService} from '../../../../../../../../src/app/services/project.service';
import {ProjectRenderItemService} from '../../../../../../../../src/app/services/project-render-item.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RenderBaseFormComponent} from '../../../render-forms-config/render-base-form/render-base-form.component';
import {ufs} from '../../../../../../../../src/app/constants/ufs.constants';
import {GeoLocationService} from "../../../../services/geo-location.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-render-form-galo-fields',
  templateUrl: './render-form-galo-fields.component.html',
  styleUrls: ['./render-form-galo-fields.component.scss']
})
export class RenderFormGaloFieldsComponent extends RenderBaseFormComponent implements OnInit {

  ufs = ufs;
  formSlug = 'galo-poc';
  fieldsForValidation = ['name'];
  useCountryMask = true;

  constructor(
    public projectService: ProjectService,
    public projectRenderItemService: ProjectRenderItemService,
    public geoLocationService: GeoLocationService,
    public elementRef: ElementRef,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toastService: ToastService
  ) {
    super(projectService, projectRenderItemService, geoLocationService, elementRef, router, activatedRoute, toastService);
    this.uploadForm = new FormGroup({
      country: new FormControl(this.defaultCountryDialCode, [Validators.required]),
      whatsapp: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.location$.subscribe(location => {
      let gotSuccess = false;
      if (location) {
        const country = this.getCountyByCode(location.country_code);
        if (country) {
          this.uploadForm.get('country').setValue(country.dial_code);
          gotSuccess = true;
        }
      }
      if (!gotSuccess) {
        this.uploadForm.get('country').setValue(this.defaultCountryDialCode);
      }
    });
  }

  mask(event: any) {
    console.warn(event);
  }

  autoComplete(): void {
    this.uploadForm.reset({
      name: 'Igor',
      number: '24',
      country: '+55'
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


}
