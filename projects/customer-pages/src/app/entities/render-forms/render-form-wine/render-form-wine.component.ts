import {Component, OnInit} from '@angular/core';
import {RenderBaseFormComponent} from '../render-base-form/render-base-form.component';
import {NbToastrService} from '@nebular/theme';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-render-form-wine',
  templateUrl: './render-form-wine.component.html',
  styleUrls: ['./render-form-wine.component.scss']
})
export class RenderFormWineComponent extends RenderBaseFormComponent implements OnInit {
  formSlug = 'wine';
  friendInput: FormControl;
  fieldsForValidation = ['name'];
  useCountryMask = true;
  petiscos = [
    {value: 'PRESUNTO_PARMA', displayName: 'Presunto de Parma'},
    {value: 'TABUA_DE_QUEIJOS', displayName: 'Tabua de queijos'}
  ];
  pratosPrincipais = [
    {value: 'TENDER', displayName: 'Tender'},
    {value: 'PERU', displayName: 'Peru'},
    {value: 'LOMBO_ASSADO', displayName: 'Lombo Assado'},
    {value: 'FILE_MIGNON', displayName: 'Filé Mignon'},
    {value: 'ALCATRA', displayName: 'Alcatra'},
    {value: 'LAGARTO', displayName: 'Lagarto'},
    {value: 'PICANHA', displayName: 'Picanha'},
    {value: 'CONTRA_FILE', displayName: 'Contra Filé'},
    {value: 'COSTELA ', displayName: 'Costela'}
  ];
  sobremesas = [
    {value: 'PANETONE', displayName: 'Panetone'},
    {value: 'RABANADA', displayName: 'Rabanada'}
  ];

  constructor(
    public toastService: NbToastrService,
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
  ) {
    super(toastService, projectService, projectRenderItemService);
    this.friendInput = new FormControl(null, [Validators.required]);
    this.uploadForm = new FormGroup({
      country: new FormControl('+55', [Validators.required]),
      whatsapp: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      alivioComico: new FormControl(null, [Validators.required]),
      amigos: new FormControl(new Set([]), [Validators.required]),
      petisco: new FormControl(null, [Validators.required]),
      pratoPrincipal: new FormControl(null, [Validators.required]),
      sobremesa: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    form.whatsapp = String(Number(form.country.replace(/ /g, '')) + form.whatsapp);
    form.country = undefined;
    form.amigos = form.amigos ? Array.from(form.amigos) : [];
    return form;
  }

  autoComplete(): void {
    this.uploadForm.reset({
      petisco: 'TABUA_DE_QUEIJOS',
      pratoPrincipal: 'PERU',
      sobremesa: 'RABANADA',
      name: 'ANA',
      country: '+55',
      alivioComico: 'Vizinho Chato',
      amigos: new Set(['Bruno', 'João', 'Marcos'])
    });
  }

  addFriend(): void {
    if (this.friendInput.valid) {
      this.makeControlASetArray();
      this.uploadForm.get('amigos')?.value?.add(this.friendInput.value);
      this.friendInput.reset();
    } else {
      this.friendInput.markAsTouched();
    }
  }

  removeFriend(friend: string): void {
    this.makeControlASetArray();
    if (this.uploadForm.get('amigos')?.value && this.uploadForm.get('amigos')?.value?.size > 0) {
      this.uploadForm.get('amigos')?.value?.delete(friend);
    }
  }

  makeControlASetArray(): void {
    if (!this.uploadForm.get('amigos')?.value) {
      this.uploadForm.get('amigos')?.setValue(new Set([]));
    }
  }
}
