import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormGaloPocDetailComponent} from './render-form-galo-poc-detail/render-form-galo-poc-detail.component';
import {RenderFormGaloPocComponent} from './render-form-galo-poc.component';
import {
  NbAutocompleteModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule, NbTooltipModule
} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {RenderFormWrapperModule} from '../../render-form-wrapper/render-form-wrapper.module';
import {
    RenderFormDetailComponentsModule
} from "../../render-form-detail-components/render-form-detail-components.module";


@NgModule({
  declarations: [
    RenderFormGaloPocDetailComponent,
    RenderFormGaloPocComponent
  ],
    imports: [
        CommonModule,
        NbFormFieldModule,
        NbInputModule,
        NbOptionModule,
        ReactiveFormsModule,
        NbSelectModule,
        NbIconModule,
        NgxMaskModule,
        RenderFormWrapperModule,
        NbAutocompleteModule,
        NbTooltipModule,
        RenderFormDetailComponentsModule
    ],
  exports: [
    RenderFormGaloPocDetailComponent,
    RenderFormGaloPocComponent
  ]
})
export class RenderFormGaloPocSharedModule {
}
