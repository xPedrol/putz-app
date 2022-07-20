import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {ufs} from '../../../../../../../src/app/constants/ufs.constants';
import {RenderBaseFormComponent} from '../render-base-form/render-base-form.component';

@Component({
  selector: 'app-render-form-galo-poc',
  templateUrl: './render-form-galo-poc.component.html',
  styleUrls: ['./render-form-galo-poc.component.scss']
})
export class RenderFormGaloPocComponent extends RenderBaseFormComponent implements OnInit {
  ufs = ufs;
  formSlug = 'galo-poc';
  fieldsForValidation = ['name'];
  useCountryMask = true;
  constructor(
    public toastService: NbToastrService,
    public projectService: ProjectService,
    public projectRenderItemService: ProjectRenderItemService,
  ) {
    super(toastService, projectService, projectRenderItemService);
    this.uploadForm = new FormGroup({
      country: new FormControl('+55', [Validators.required]),
      whatsapp: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    super.ngOnInit();

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
    form.whatsapp = Number(Number(form.country.replace(/ /g, '')) + form.whatsapp);
    form.country = undefined;
    return form;
  }


}
