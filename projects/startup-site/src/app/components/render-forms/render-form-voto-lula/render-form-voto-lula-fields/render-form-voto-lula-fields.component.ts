import {Component, ElementRef, OnInit, QueryList, ViewChild} from '@angular/core';
import {ExternalApisService} from '../../../../../../../../src/app/services/external-apis.service';
import {ProjectRenderItemService} from '../../../../../../../../src/app/services/project-render-item.service';
import {ProjectService} from '../../../../../../../../src/app/services/project.service';
import {GeoLocationService} from '../../../../services/geo-location.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {RenderBaseFormComponent} from '../../../render-forms-config/render-base-form/render-base-form.component';
import {ufsWithTitle} from '../../../../../../../../src/app/constants/ufs.constants';
import {FormVotoLulaReasonEnum} from '../constants/form-voto-lula-reason.constants';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageCropperDialogComponent} from '../../../image-cropper/image-cropper-dialog/image-cropper-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../../services/toast.service';
import {TabComponent, TabsetComponent} from 'ngx-tabset';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-render-form-voto-lula-fields',
  templateUrl: './render-form-voto-lula-fields.component.html',
  styleUrls: ['./render-form-voto-lula-fields.component.scss']
})
export class RenderFormVotoLulaFieldsComponent extends RenderBaseFormComponent implements OnInit {
  @ViewChild('tabsetComponent', {static: true}) tabsetComponent: TabsetComponent;

  renderPass = 'lula22';

  counties: any[] | undefined;
  ufs: { title: string, value: string }[] = ufsWithTitle;
  formSlug = 'voto-lula';
  fieldsForValidation = ['name'];
  useCountryMask = true;
  reason = FormVotoLulaReasonEnum;
  reasons = [
    {
      title: 'A favor Democracia',
      description: 'Eu voto pela democracia!',
      image: 'assets/images/forms/pt-lula/democracia.jpg',
      key: FormVotoLulaReasonEnum.DEMOCRACIA
    },
    {
      title: 'Contra as Fake News',
      description: 'Eu voto para acabar com as Fake News!',
      image: 'assets/images/forms/pt-lula/fake_news.webp',
      key: FormVotoLulaReasonEnum.FAKE_NEWS
    },
    {
      title: 'Acabar com a Fome',
      description: 'Eu voto para acabar com a fome!',
      image: 'assets/images/forms/pt-lula/fome-3.jpg',
      key: FormVotoLulaReasonEnum.FOME
    }
  ];
  imageFile: any;
  tab1FormGroup: FormGroup;
  tab2FormGroup: FormGroup;
  tab3FormGroup: FormGroup;
  tab4FormGroup: FormGroup;

  constructor(
    private externalService: ExternalApisService,
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
    public geoLocationService: GeoLocationService,
    public modalService: NgbModal,
    public elementRef: ElementRef,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public toastService: ToastService,
    private viewportScroller: ViewportScroller
  ) {
    super(projectService, projectRenderItemService, geoLocationService, elementRef, router, activatedRoute, toastService);
    this.tab1FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      uf: new FormControl(null, [Validators.required]),
    });
    this.tab2FormGroup = new FormGroup({
      urlPhoto: new FormControl(null, [Validators.required]),
    });
    this.tab3FormGroup = new FormGroup({
      reason: new FormControl(null, [Validators.required]),
    });
    this.tab4FormGroup = new FormGroup({
      country: new FormControl(this.defaultCountryDialCode),
      whatsapp: new FormControl(null),
    });

    this.uploadForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      uf: new FormControl(null, [Validators.required]),
      country: new FormControl(this.defaultCountryDialCode),
      whatsapp: new FormControl(null),
      reason: new FormControl(null, [Validators.required]),
      urlPhoto: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.hasWhatsapp) {
      this.tab4FormGroup.get('whatsapp').addValidators(Validators.required);
      this.tab4FormGroup.get('whatsapp').addValidators(Validators.required);
      this.uploadForm.get('whatsapp').addValidators(Validators.required);
      this.uploadForm.get('country').addValidators(Validators.required);
    } else {
      this.uploadForm.get('whatsapp').clearValidators();
      this.uploadForm.get('country').clearValidators();
    }

    this.uploadForm.updateValueAndValidity();

    if (this.useCountryMask && this.tab4FormGroup.get('country')) {
      if (this.tab4FormGroup.get('country')?.value) {
        this.countryChange(this.tab4FormGroup.get('country')?.value);
      }
      this.tab4FormGroup.get('country')?.valueChanges.subscribe(value => {
        if (value) {
          this.countryChange(value);
        }
      });
    }
  }

  createFromForm(): any {
    const form = this.uploadForm.getRawValue();
    if (this.hasWhatsapp) {
      form.whatsapp = form.country + form.whatsapp;
    } else {
      form.whatsapp = undefined;
    }

    form.country = undefined;
    return form;
  }

  autoComplete(): void {
    this.uploadForm.reset({
      uf: 'MG',
      name: 'ANA',
      country: '+55',
      whatsapp: null,
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

    modalRef.componentInstance.ratio = 3 / 4;
    modalRef.componentInstance.resizeToHeight = 539;
    modalRef.componentInstance.resizeToWidth = 416;
    modalRef.componentInstance.imageFile = this.imageFile;

    modalRef.result.then((croppedImage) => {
      if (croppedImage) {
        // console.warn(croppedImage);
        this.tab2FormGroup.get('urlPhoto').setValue(croppedImage);
      } else {
        this.tab2FormGroup.get('urlPhoto').reset();
      }
    }, () => {

    });
  }

  selectReason(reason: FormVotoLulaReasonEnum): void {
    if (reason === this.tab3FormGroup.get('reason').value) {
      this.tab3FormGroup.get('reason').reset();
      return;
    }
    this.tab3FormGroup.get('reason').setValue(reason);
    this.selectTab(this.tab3FormGroup, 3);
  }

  onSelect(event: any) {
    this.imageFile = event.addedFiles[0];
    if (this.imageFile) {
      this.openImageCropperDialog();
    }
  }

  onRemove() {
    this.imageFile = undefined;
  }

  selectTab(formGroup: FormGroup, nextTabOrder: number): void {
    let tabs: QueryList<TabComponent> = this.tabsetComponent.tabs;
    if (formGroup.valid) {
      //Array começa no Zero e na tela com NGif a aba nao aparece
      this.tabsetComponent.selectTab(tabs.get(nextTabOrder));
    } else {
      this.focusOnInvalid(formGroup);
      this.viewportScroller.scrollToAnchor('form-tabs');
      formGroup.markAllAsTouched();
    }
  }

  setUploadForm(): void {
    this.uploadForm.reset({
      uf: this.tab1FormGroup.get('uf').value,
      name: this.tab1FormGroup.get('name').value,
      country: this.tab4FormGroup.get('country').value,
      whatsapp: this.tab4FormGroup.get('whatsapp').value,
      reason: this.tab3FormGroup.get('reason').value,
      urlPhoto: this.tab2FormGroup.get('urlPhoto').value
    });
    this.uploadForm.updateValueAndValidity();
  }

  onTabChange(tabIndex: any): void {
    if (tabIndex === 4) {
      this.setUploadForm();
    }
  }

  onTabsSubmit() {
    this.uploadForm = new FormGroup({
      name: this.tab1FormGroup.get('name'),
      uf: this.tab1FormGroup.get('uf'),
      urlPhoto: this.tab2FormGroup.get('urlPhoto'),
      reason: this.tab3FormGroup.get('reason'),
      country: this.tab4FormGroup.get('country'),
      whatsapp: this.tab4FormGroup.get('whatsapp'),
    });
    return this.onSubmitWithForm();
  }
}
