import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderFormCreditasDetailComponent } from './render-form-creditas-detail/render-form-creditas-detail.component';
import {RenderFormCreditasComponent} from "./render-form-creditas.component";
import {ReactiveFormsModule} from "@angular/forms";
import {
  NbAutocompleteModule, NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule
} from "@nebular/theme";
import {NgxCurrencyModule} from "ngx-currency";
import {RenderFormWrapperModule} from "../../render-form-wrapper/render-form-wrapper.module";
import {NgxMaskModule} from "ngx-mask";
import {
    RenderFormDetailComponentsModule
} from "../../render-form-detail-components/render-form-detail-components.module";



@NgModule({
  declarations: [
    RenderFormCreditasDetailComponent,
    RenderFormCreditasComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NbInputModule,
        NbFormFieldModule,
        NbAutocompleteModule,
        NbSelectModule,
        NgxCurrencyModule,
        RenderFormWrapperModule,
        NbIconModule,
        NbTooltipModule,
        NgxMaskModule,
        NbDatepickerModule,
        RenderFormDetailComponentsModule
    ]
})
export class RenderFormCreditasSharedModule { }
