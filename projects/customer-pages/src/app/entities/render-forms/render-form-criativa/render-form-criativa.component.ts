import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NbToastrService} from "@nebular/theme";
import {ProjectRenderItemService} from "../../../../../../../src/app/services/project-render-item.service";
import {ProjectService} from "../../../../../../../src/app/services/project.service";
import {RenderBaseFormComponent} from "../render-base-form/render-base-form.component";

@Component({
  selector: 'app-render-form-criativa',
  templateUrl: './render-form-criativa.component.html',
  styleUrls: ['./render-form-criativa.component.scss']
})
export class RenderFormCriativaComponent extends RenderBaseFormComponent implements OnInit{
  formSlug = 'criativa';
  useCountryMask = true;
  fieldsForValidation = ['nome'];
  constructor(
    public toastService: NbToastrService,
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
  ) {
    super(toastService, projectService, projectRenderItemService);
    this.uploadForm = new FormGroup({
      dia1: new FormControl(null, [Validators.required]),
      dia2: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      horario1: new FormControl(null, [Validators.required]),
      horario2: new FormControl(null, [Validators.required]),
      nome: new FormControl(null, [Validators.required]),
      serie: new FormControl(null, [Validators.required]),
      turma: new FormControl(null, [Validators.required]),
      turno: new FormControl(null, [Validators.required]),
      whatsapp: new FormControl(null),
      country: new FormControl('+55'),
    })
  }

  ngOnInit(): void {
    super.ngOnInit();
  }


  autoComplete(): void {
    this.uploadForm.reset({
      dia1: 'quinta',
      dia2: 'teste.email@franq.com.br',
      email: 'teste.email@franq.com.br',
      horario1: 'teste1',
      horario2: 'teste12',
      nome: 'Joao Cleber',
      serie: '3',
      turma: '1',
      turno: '1',
      country: '+55',
    });
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    form.whatsapp = form.whatsapp ? Number('55' + form.whatsapp) : undefined;
    return form;
  }

}
