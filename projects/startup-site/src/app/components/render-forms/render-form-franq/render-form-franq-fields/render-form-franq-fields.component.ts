import {Component, ElementRef, OnInit} from '@angular/core';
import {IProject} from "../../../../../../../../src/app/models/project.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectRenderItemService} from "../../../../../../../../src/app/services/project-render-item.service";
import {ProjectService} from "../../../../../../../../src/app/services/project.service";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {genders} from "../../../../../../../../src/app/constants/gender.constants";
import {RenderBaseFormComponent} from "../../../render-forms-config/render-base-form/render-base-form.component";
import {GeoLocationService} from "../../../../services/geo-location.service";
import {ImageCropperDialogComponent} from "../../../image-cropper/image-cropper-dialog/image-cropper-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-render-form-franq-fields',
  templateUrl: './render-form-franq-fields.component.html',
  styleUrls: ['./render-form-franq-fields.component.scss']
})
export class RenderFormFranqFieldsComponent extends RenderBaseFormComponent implements OnInit {

  croppedImage: any = '';

  project: IProject | undefined;
  useCountryMask = true;
  file: FormControl;
  genders = genders;
  formSlug = 'franq-poc';


  constructor(
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
    public geoLocationService: GeoLocationService,
    public elementRef: ElementRef,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalService: NgbModal,
    public toastService: ToastService
  ) {
    super(projectService, projectRenderItemService, geoLocationService, elementRef, router, activatedRoute, toastService);
    this.file = new FormControl();
    this.uploadForm = new FormGroup({
      country: new FormControl(this.defaultCountryDialCode, [Validators.required]),
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

  openImageCropperDialog(): void {
    const modalRef = this.modalService.open(ImageCropperDialogComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    });

    modalRef.componentInstance.ratio = 1;
    modalRef.componentInstance.resizeToHeight = 500;
    modalRef.componentInstance.resizeToWidth = 500;

    modalRef.result.then((croppedImage) => {
      if (croppedImage) {
        // console.warn(croppedImage);
        this.uploadForm.get('urlPhoto').setValue(croppedImage);
      }
    }, () => {

    });
  }
}
