import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormVotoLulaComponent} from "./render-form-voto-lula.component";
import {ReactiveFormsModule} from "@angular/forms";
import {
  NbButtonModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule
} from "@nebular/theme";
import {NgxMaskModule} from "ngx-mask";
import {ImageCropperModule} from "ngx-image-cropper";
import { RenderFormVotoLulaDetailComponent } from './render-form-voto-lula-detail/render-form-voto-lula-detail.component';
import {RenderFormWrapperModule} from "../../render-form-wrapper/render-form-wrapper.module";
import {
    RenderFormDetailComponentsModule
} from "../../render-form-detail-components/render-form-detail-components.module";


@NgModule({
  declarations: [
    RenderFormVotoLulaComponent,
    RenderFormVotoLulaDetailComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NbFormFieldModule,
        NbOptionModule,
        NbSelectModule,
        NbIconModule,
        NbInputModule,
        NgxMaskModule,
        ImageCropperModule,
        RenderFormWrapperModule,
        NbButtonModule,
        RenderFormDetailComponentsModule
    ],
  exports: [
    RenderFormVotoLulaComponent,
    RenderFormVotoLulaDetailComponent
  ]
})
export class RenderFormVotoLulaSharedModule {
}
