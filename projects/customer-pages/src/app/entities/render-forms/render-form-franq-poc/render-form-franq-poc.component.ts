import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {IProject} from '../../../../../../../src/app/models/project.model';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {genders} from '../../../../../../../src/app/constants/gender.constants';
import {RenderBaseFormComponent} from '../render-base-form/render-base-form.component';
import {ImageCroppedEvent, LoadedImage} from 'ngx-image-cropper';

@Component({
  selector: 'app-render-form-franq-poc',
  templateUrl: './render-form-franq-poc.component.html',
  styleUrls: [
    './render-form-franq-poc.component.scss',
    '../../../../../../../src/app/shared/themes/image-cropper.scss'
  ]
})
export class RenderFormFranqPocComponent extends RenderBaseFormComponent implements OnInit {
  croppedImage: any = '';

  project: IProject | undefined;
  useCountryMask = true;
  file: FormControl;
  genders = genders;
  formSlug = 'franq-poc';


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
      email: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      urlPhoto: new FormControl(null,),
      urlQrCode: new FormControl(null),
      whatsapp: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  autoComplete() {
    this.uploadForm.reset({
      name: 'Joao Cleber',
      email: 'teste.email@franq.com.br',
      urlPhoto: 'https://api.putzfilmes.com/static/person/00--avatar-putz.jpg',
      urlQrCode: 'http://www.franq.com.br',
      gender: 'F',
      country: '+55',
      phone: '31988881234'
    });
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    const countryCode = Number(form.country.replace(/ /g, ''));
    form.whatsapp = Number(countryCode + form.whatsapp);
    form.phone = Number(countryCode + form.phone);
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
