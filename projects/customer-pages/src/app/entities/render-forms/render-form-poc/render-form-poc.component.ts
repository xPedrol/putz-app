import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {ExternalApisService} from '../../../../../../../src/app/services/external-apis.service';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {takeUntil} from 'rxjs/operators';
import {ufs} from '../../../../../../../src/app/constants/ufs.constants';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {RenderBaseFormComponent} from '../render-base-form/render-base-form.component';


@Component({
  selector: 'app-render-form-poc',
  templateUrl: './render-form-poc.component.html',
  styleUrls: ['./render-form-poc.component.scss']
})
export class RenderFormPocComponent extends RenderBaseFormComponent implements OnInit {
  counties: any[] | undefined;
  ufs = ufs;
  formSlug = 'poc';
  fieldsForValidation = ['name'];
  useCountryMask = true;
  constructor(
    public toastService: NbToastrService,
    private externalService: ExternalApisService,
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
  ) {
    super(toastService, projectService, projectRenderItemService);
    this.uploadForm = new FormGroup({
      country: new FormControl('+55', [Validators.required]),
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
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    form.whatsapp = Number(Number(form.country.replace(/ /g, '')) + form.whatsapp);
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
