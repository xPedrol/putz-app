import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormVotoLulaDetailComponent} from './render-form-voto-lula-detail/render-form-voto-lula-detail.component';
import {RenderFormVotoLulaFieldsComponent} from './render-form-voto-lula-fields/render-form-voto-lula-fields.component';
import {RenderFormsConfigModule} from "../../render-forms-config/render-forms-config.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {RouterModule, Routes} from "@angular/router";
import {NgbAccordionModule, NgbAlertModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {ImageCropperHandleModule} from "../../image-cropper/image-cropper-handle.module";
import {PtBannerComponent} from "./eu-voto-lula/pt-banner/pt-banner.component";
import {EuVotoLulaComponent} from "./eu-voto-lula/eu-voto-lula.component";
import {PtComoUsarComponent} from "./eu-voto-lula/pt-como-usar/pt-como-usar.component";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {NgStepperModule} from "../../ng-stepper/ng-stepper.module";
import {
  FieldErrorMessageModule
} from "../../../../../../../src/app/shared/components/field-error-message/field-error-message.module";
import {TabsModule} from "ngx-tabset";
import {NgxDropzoneModule} from "ngx-dropzone";

const routes: Routes = [
  {path: '', component: EuVotoLulaComponent, data:{isPrecadastro: false, hasWhatsapp:false}},
  {path: 'direto', component: EuVotoLulaComponent, data:{isPrecadastro: false, hasWhatsapp:false}},
  {path: 'diretowhatsapp', component: EuVotoLulaComponent, data:{isPrecadastro: false, hasWhatsapp:true}},

  {path: 'whatsapp', component: EuVotoLulaComponent, data:{isPrecadastro: true, hasWhatsapp:true}},
  // {path: 'pre', component: EuVotoLulaComponent, data:{isPrecadastro: true, hasWhatsapp:false}},
  {path: 'forms', component: RenderFormVotoLulaDetailComponent},
];


@NgModule({
  declarations: [
    RenderFormVotoLulaDetailComponent,
    RenderFormVotoLulaFieldsComponent,
    EuVotoLulaComponent,
    PtBannerComponent,
    PtComoUsarComponent
  ],
    exports: [
        RenderFormVotoLulaDetailComponent,
        RenderFormVotoLulaFieldsComponent,
        PtComoUsarComponent
    ],
  imports: [
    CommonModule,
    RenderFormsConfigModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxMaskModule,
    NgbTypeaheadModule,
    NgbAccordionModule,
    ImageCropperHandleModule,
    NgbAlertModule,
    CdkStepperModule, NgStepperModule, FieldErrorMessageModule, TabsModule, NgxDropzoneModule,
  ]
})
export class RenderFormVotoLulaModule {
}
