import {Component, OnInit} from '@angular/core';
import {ExternalApisService} from "../../../../../../../../src/app/services/external-apis.service";
import {ProjectRenderItemService} from "../../../../../../../../src/app/services/project-render-item.service";
import {ProjectService} from "../../../../../../../../src/app/services/project.service";
import {GeoLocationService} from "../../../../services/geo-location.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {RenderBaseFormComponent} from "../../../render-forms-config/render-base-form/render-base-form.component";
import {ufs} from "../../../../../../../../src/app/constants/ufs.constants";
import {FormVotoLulaReasonEnum} from "../constants/form-voto-lula-reason.constants";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageCropperDialogComponent} from "../../../image-cropper/image-cropper-dialog/image-cropper-dialog.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-render-form-voto-lula-fields',
  templateUrl: './render-form-voto-lula-fields.component.html',
  styleUrls: ['./render-form-voto-lula-fields.component.scss']
})
export class RenderFormVotoLulaFieldsComponent extends RenderBaseFormComponent implements OnInit {


  counties: any[] | undefined;
  ufs = ufs;
  formSlug = 'voto-lula';
  fieldsForValidation = ['name'];
  useCountryMask = true;
  reason = FormVotoLulaReasonEnum;
  reasons = [
    {
      title: 'A favor Democracia',
      image: 'assets/images/forms/pt-lula/democracia.gif',
      key: FormVotoLulaReasonEnum.DEMOCRACIA
    },
    {
      title: 'Contra as Fake News',
      image: 'assets/images/forms/pt-lula/fake_news.gif',
      key: FormVotoLulaReasonEnum.FAKE_NEWS
    },
    {
      title: 'Acabar com a Fome',
      image: 'assets/images/forms/pt-lula/fome.gif',
      key: FormVotoLulaReasonEnum.FOME
    }
  ];

  constructor(
    private externalService: ExternalApisService,
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
    public geoLocationService: GeoLocationService,
    private modalService: NgbModal,
    private http: HttpClient
  ) {
    super(projectService, projectRenderItemService, geoLocationService);
    this.uploadForm = new FormGroup({
      country: new FormControl(this.defaultCountryDialCode, [Validators.required]),
      whatsapp: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      urlPhoto: new FormControl('', [Validators.required]),
      uf: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    super.ngOnInit();
    // this.http.get("https://startup.putzfilmes.com/assets/images/form-voto-lula/semfoto.png", {
    //   responseType: 'blob' as 'json'
    // }).subscribe((response: any) => {
    //   let dataType = response.type;
    //   let binaryData = [];
    //   binaryData.push(response);
    //   this.uploadForm.get('urlPhoto').setValue("https://startup.putzfilmes.com/assets/images/form-voto-lula/semfoto.png");
    // });
    this.location$.subscribe(location => {
      let gotSuccess = false;
      if (location) {
        const country = this.getCountyByCode(location.country_code);
        if (country) {
          this.uploadForm.get('country').setValue(country.dial_code);
          this.uploadForm.get('uf').setValue(location.uf);
          gotSuccess = true;
        }
      }
      if (!gotSuccess) {
        this.uploadForm.get('country').setValue(this.defaultCountryDialCode);
      }
    });
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    form.whatsapp = form.country + form.whatsapp;
    // console.warn(form);
    // form.whatsapp = Number(Number(form.country.replace(/ /g, '')) + form.whatsapp);
    form.country = undefined;
    return form;
  }

  autoComplete(): void {
    this.uploadForm.reset({
      city: 'Timoteo',
      uf: 'MG',
      name: 'ANA',
      country: '+55',
      whatsapp: '',
      reason: FormVotoLulaReasonEnum.FOME
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

  openImageCropperDialog(): void {
    const modalRef = this.modalService.open(ImageCropperDialogComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    });

    modalRef.componentInstance.ratio = 3/4;
    modalRef.componentInstance.resizeToHeight = 539;
    modalRef.componentInstance.resizeToWidth = 416;

    modalRef.result.then((croppedImage) => {
      if (croppedImage) {
        // console.warn(croppedImage);
        this.uploadForm.get('urlPhoto').setValue(croppedImage);
      }
    }, () => {

    });
  }

  selectReason(reason: FormVotoLulaReasonEnum): void {
    if (reason === this.uploadForm.get('reason').value) {
      this.uploadForm.get('reason').reset();
      return;
    }
    this.uploadForm.get('reason').setValue(reason);
  }

}
