import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormCriativaComponent} from './render-form-criativa.component';
import {
  NbAutocompleteModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule
} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {RenderFormWrapperModule} from '../../render-form-wrapper/render-form-wrapper.module';
import { RenderFormCriativaDetailComponent } from './render-form-criativa-detail/render-form-criativa-detail.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxMaskModule} from "ngx-mask";
import {
    RenderFormDetailComponentsModule
} from "../../render-form-detail-components/render-form-detail-components.module";




@NgModule({
  declarations: [
    RenderFormCriativaComponent,
    RenderFormCriativaDetailComponent
  ],
  exports: [
    RenderFormCriativaComponent,
    RenderFormCriativaDetailComponent
  ],
    imports: [
        CommonModule,
        NbInputModule,
        NbFormFieldModule,
        ReactiveFormsModule,
        RenderFormWrapperModule,
        TranslateModule,
        NbIconModule,
        NbSelectModule,
        NgxMaskModule,
        NbAutocompleteModule,
        NbTooltipModule,
        RenderFormDetailComponentsModule
    ]
})
export class RenderFormCriativaSharedModule {
}
