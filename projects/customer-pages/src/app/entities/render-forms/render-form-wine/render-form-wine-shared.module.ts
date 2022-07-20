import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormWineDetailComponent} from './render-form-wine-detail/render-form-wine-detail.component';
import {RenderFormWrapperModule} from "../../render-form-wrapper/render-form-wrapper.module";
import {
  NbAlertModule, NbAutocompleteModule,
  NbButtonModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule,
  NbTagModule, NbTooltipModule
} from "@nebular/theme";
import {RenderFormWineComponent} from "./render-form-wine.component";
import {PipeModule} from "../../../../../../../src/app/core/pipes/pipe.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {
    RenderFormDetailComponentsModule
} from "../../render-form-detail-components/render-form-detail-components.module";


@NgModule({
  declarations: [
    RenderFormWineDetailComponent,
    RenderFormWineComponent
  ],
    imports: [
        CommonModule,
        RenderFormWrapperModule,
        NbTagModule,
        NbIconModule,
        PipeModule,
        NbButtonModule,
        NbFormFieldModule,
        NbInputModule,
        NbOptionModule,
        NbSelectModule,
        ReactiveFormsModule,
        NbAlertModule,
        NbAutocompleteModule,
        NbTooltipModule,
        NgxMaskModule,
        RenderFormDetailComponentsModule
    ]
})
export class RenderFormWineSharedModule { }
