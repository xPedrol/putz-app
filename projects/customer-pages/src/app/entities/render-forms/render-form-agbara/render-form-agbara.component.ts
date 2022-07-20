import {Component, OnInit} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RenderBaseFormComponent} from '../render-base-form/render-base-form.component';
import {genders} from '../../../../../../../src/app/constants/gender.constants';

@Component({
  selector: 'app-render-form-agbara',
  templateUrl: './render-form-agbara.component.html',
  styleUrls: ['./render-form-agbara.component.scss']
})
export class RenderFormAgbaraComponent extends RenderBaseFormComponent implements OnInit {

  escolaridades = [
    {
      value: 'FUNDAMENTAL',
      displayValue: 'Fundamental'
    },
    {
      value: 'FUNDAMENTA_INCOMPLETO',
      displayValue: 'Fundamental imcompleto'
    },
    {
      value: 'MEDIO',
      displayValue: 'Médio'
    },
    {
      value: 'SUPERIOR',
      displayValue: 'Fundamental'
    },
    {
      value: 'SUPERIORINCOMPLETO',
      displayValue: 'Superior incompleto'
    }
  ];
  estrategias = [
    {
      value: 'EDUCATIVO',
      displayValue: 'Educativo'
    },
    {
      value: 'INCISIVO',
      displayValue: 'Incisivo'
    },
    {
      value: 'INFORMACIONAL ',
      displayValue: 'Informacional'
    }
  ];
  faixaEtarias = [
    {
      value: '_18',
      displayValue: 'Menos de 18'
    },
    {
      value: '_18_29',
      displayValue: '18 a 29'
    },
    {
      value: '_30_39',
      displayValue: '30 a 39'
    },
    {
      value: '_40_49',
      displayValue: '40 a 49'
    },
    {
      value: '_50',
      displayValue: 'Mais de 50'
    }
  ];
  regions = [
    {
      value: 'CENTRO_OESTE',
      displayValue: 'Centro Oeste'
    },
    {
      value: 'NORDESTE',
      displayValue: 'Nordeste'
    },
    {
      value: 'NORTE',
      displayValue: 'Norte'
    },
    {
      value: 'SUDESTE',
      displayValue: 'Sudeste'
    },
    {
      value: 'SUL',
      displayValue: 'Sul'
    }
  ];
  rendas = [
    {
      value: 'ATE_1_SALARIOS',
      displayValue: 'Até 1 salário mínimo'
    },
    {
      value: 'ATE_2_SALARIOS',
      displayValue: 'Até 2 salários mínimos'
    },
    {
      value: 'ATE_4_SALARIOS',
      displayValue: 'Até 4 salários mínimos'
    },
    {
      value: 'ATE_6_SALARIOS ',
      displayValue: 'Até 6 salários mínimos'
    },
    {
      value: 'ATE_30_SALARIOS',
      displayValue: 'Até 30 salários mínimos'
    },
  ];
  genders = genders;
  formSlug = 'agbara';

  constructor(
    public toastService: NbToastrService,
    public projectService: ProjectService,
    public projectRenderItemService: ProjectRenderItemService,
  ) {
    super(toastService, projectService, projectRenderItemService);
    this.uploadForm = new FormGroup({
      whatsapp: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      estrategia: new FormControl('', [Validators.required]),
      escolaridade: new FormControl('', [Validators.required]),
      faixaEtaria: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      renda: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
    });
  }


  autoComplete(): void {
    this.uploadForm.reset({
      name: 'Miranda',
      estrategia: 'EDUCATIVO',
      faixaEtaria: '_18_29',
      gender: 'F',
      renda: 'ATE_2_SALARIOS',
      region: 'SUDESTE',
      escolaridade: 'SUPERIOR'
    });
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    form.whatsapp = Number(55 + form.whatsapp);
    return form;
  }

}
