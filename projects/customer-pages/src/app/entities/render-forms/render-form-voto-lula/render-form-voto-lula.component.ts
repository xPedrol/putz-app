import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {IProject} from '../../../../../../../src/app/models/project.model';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {RenderBaseFormComponent} from '../render-base-form/render-base-form.component';
import {ImageCroppedEvent, LoadedImage} from 'ngx-image-cropper';
import {ufs} from '../../../../../../../src/app/constants/ufs.constants';

@Component({
  selector: 'app-render-form-voto-lula',
  templateUrl: './render-form-voto-lula.component.html',
  styleUrls: [
    './render-form-voto-lula.component.scss',
    '../../../../../../../src/app/shared/themes/image-cropper.scss'
  ]
})
export class RenderFormVotoLulaComponent extends RenderBaseFormComponent implements OnInit {
  croppedImage: any = '';

  ufs = ufs;


  project: IProject | undefined;
  useCountryMask = true;
  file: FormControl;
  formSlug = 'voto-lula';


  constructor(
    public toastService: NbToastrService,
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
  ) {
    super(toastService, projectService, projectRenderItemService);
    this.file = new FormControl();
    this.uploadForm = new FormGroup({
      country: new FormControl('+55', [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      urlPhoto: new FormControl(null,),
      whatsapp: new FormControl(null, [Validators.required]),
      uf: new FormControl('', [Validators.required])

    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  autoComplete() {
    this.uploadForm.reset({
      name: 'Joao Cleber',
      urlPhoto: 'https://api.putzfilmes.com/static/person/00--avatar-putz.jpg',
      uf: 'MG',
      reason: 'DEMOCRACIA',
      country: '+55',
    });
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    const countryCode = Number(form.country.replace(/ /g, ''));
    form.whatsapp = Number(countryCode + form.whatsapp);
    form.country = undefined;
    form.urlPhoto = this.croppedImage;
    return form;
  }

  fileChangeEvent(event: any): void {
    this.uploadForm.get('urlPhoto')?.setValue(event);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }
}
