import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormCreditasDetailComponent} from './render-form-creditas-detail/render-form-creditas-detail.component';
import {RenderFormCreditasFieldsComponent} from './render-form-creditas-fields/render-form-creditas-fields.component';
import {RenderFormsConfigModule} from "../../render-forms-config/render-forms-config.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {NgxCurrencyModule} from "ngx-currency";
import {RouterModule, Routes} from "@angular/router";
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {RenderFormsModule} from "../render-forms.module";

const routes: Routes = [
  {path: '', component: RenderFormCreditasDetailComponent},
  {path: 'forms', component: RenderFormCreditasDetailComponent}
];


@NgModule({
  declarations: [
    RenderFormCreditasDetailComponent,
    RenderFormCreditasFieldsComponent
  ],
    imports: [
        CommonModule,
        RenderFormsConfigModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgxMaskModule,
        NgxCurrencyModule,
        NgbTypeaheadModule,
        RenderFormsModule
    ]
})
export class RenderFormCreditasModule {
}
