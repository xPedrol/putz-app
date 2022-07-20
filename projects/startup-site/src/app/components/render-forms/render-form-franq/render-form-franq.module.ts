import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormFranqDetailComponent} from './render-form-franq-detail/render-form-franq-detail.component';
import {RenderFormFranqFieldsComponent} from './render-form-franq-fields/render-form-franq-fields.component';
import {RenderFormsConfigModule} from "../../render-forms-config/render-forms-config.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ImageCropperModule} from "ngx-image-cropper";
import {NgxMaskModule} from "ngx-mask";
import {RouterModule, Routes} from "@angular/router";
import {RenderFormsModule} from "../render-forms.module";

const routes: Routes = [
  {path: '', component: RenderFormFranqDetailComponent},
  {path: 'forms', component: RenderFormFranqDetailComponent}
];

@NgModule({
  declarations: [
    RenderFormFranqDetailComponent,
    RenderFormFranqFieldsComponent
  ],
    imports: [
        CommonModule,
        RenderFormsConfigModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        ImageCropperModule,
        NgxMaskModule,
        RenderFormsModule
    ]
})
export class RenderFormFranqModule {
}
