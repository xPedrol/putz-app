import {Component, ElementRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IProject} from '../../../../../../../../src/app/models/project.model';
import {
  ProdutoEnumArray
} from '../../../../../../../customer-pages/src/app/entities/render-forms/render-form-creditas/formCreditas.model';
import {ProjectService} from '../../../../../../../../src/app/services/project.service';
import {ProjectRenderItemService} from '../../../../../../../../src/app/services/project-render-item.service';
import {RenderBaseFormComponent} from '../../../render-forms-config/render-base-form/render-base-form.component';
import {GeoLocationService} from '../../../../services/geo-location.service';
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-render-form-creditas-fields',
  templateUrl: './render-form-creditas-fields.component.html',
  styleUrls: ['./render-form-creditas-fields.component.scss']
})
export class RenderFormCreditasFieldsComponent extends RenderBaseFormComponent implements OnInit {

  uploadForm: FormGroup;
  project: IProject | undefined;
  file: FormControl;
  formSlug = 'creditas';
  fieldsForValidation = ['name'];
  produtos = ProdutoEnumArray;
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
    this.file = new FormControl();
    this.uploadForm = new FormGroup({
      data_venc: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      produto: new FormControl('', [Validators.required]),
      taxa_juros: new FormControl('', [Validators.required]),
      valor_empr: new FormControl('', [Validators.required]),
      valor_parc: new FormControl('', [Validators.required]),
      whatsapp: new FormControl('', [Validators.required]),
      country: new FormControl(this.defaultCountryDialCode, [Validators.required]),
    });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    const countryCode = Number(form.country.replace(/ /g, ''));
    form.whatsapp = Number(countryCode + form.whatsapp);
    form.phone = Number(countryCode + form.phone);
    form.country = undefined;
    return form;
  }

  autoComplete() {
    this.uploadForm.reset({
      data_venc: '2022-06-12T19:30',
      email: "alessio@alessiojr.com",
      id: "079dab6c-d04a-413f-a6d5-a9e7fe773284",
      name: "Anna",
      produto: "AUTO_EQUITY",
      taxa_juros: 0.30,
      valor_empr: 50000.44,
      valor_parc: 1244.11,
      country: '+55',
    });
  }
}
