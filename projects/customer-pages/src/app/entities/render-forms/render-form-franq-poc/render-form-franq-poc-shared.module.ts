import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormFranqPocComponent} from "./render-form-franq-poc.component";
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
import { RenderFormFranqPocDetailComponent } from './render-form-franq-poc-detail/render-form-franq-poc-detail.component';
import {RenderFormWrapperModule} from "../../render-form-wrapper/render-form-wrapper.module";
import {
    RenderFormDetailComponentsModule
} from "../../render-form-detail-components/render-form-detail-components.module";


@NgModule({
  declarations: [
    RenderFormFranqPocComponent,
    RenderFormFranqPocDetailComponent
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
    RenderFormFranqPocComponent
  ]
})
export class RenderFormFranqPocSharedModule {
}
