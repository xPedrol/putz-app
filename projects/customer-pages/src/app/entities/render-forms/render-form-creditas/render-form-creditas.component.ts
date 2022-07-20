import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {Subject} from 'rxjs';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {IProject} from '../../../../../../../src/app/models/project.model';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {RenderBaseFormComponent} from "../render-base-form/render-base-form.component";
import {ProdutoEnumArray} from "./formCreditas.model";
import * as moment from "moment";
import {
  countryCodes,
  countryMasks,
  findCountyByDialCode
} from "../../../../../../../src/app/constants/country-codes.constants";

@Component({
  selector: 'app-render-form-creditas',
  templateUrl: './render-form-creditas.component.html',
  styleUrls: ['./render-form-creditas.component.scss']
})
export class RenderFormCreditasComponent extends RenderBaseFormComponent implements OnInit {
  uploadForm: FormGroup;
  subject$: Subject<any>;
  counties: any[] | undefined;
  project: IProject | undefined;
  fileView = false;
  file: FormControl;
  formSlug = 'creditas';
  fieldsForValidation = ['name'];
  produtos = ProdutoEnumArray;
  useCountryMask = true;
  constructor(
    public toastService: NbToastrService,
    public projectService: ProjectService,
    public projectRenderItemService: ProjectRenderItemService
  ) {
    super(toastService, projectService, projectRenderItemService);
    this.file = new FormControl();
    this.subject$ = new Subject();
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
      country: new FormControl('+55', [Validators.required]),
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
      data_venc: moment('2022-05-31'),
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
