import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormPocDetailComponent} from './render-form-poc-detail/render-form-poc-detail.component';
import {RenderFormPocFieldsComponent} from './render-form-poc-fields/render-form-poc-fields.component';
import {RenderFormsConfigModule} from '../../render-forms-config/render-forms-config.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {RouterModule, Routes} from '@angular/router';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {RenderFormsModule} from "../render-forms.module";

const routes: Routes = [
  {path: '', component: RenderFormPocDetailComponent},
  {path: 'forms', component: RenderFormPocDetailComponent}
];


@NgModule({
  declarations: [
    RenderFormPocDetailComponent,
    RenderFormPocFieldsComponent
  ],
  imports: [
    CommonModule,
    RenderFormsConfigModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxMaskModule,
    NgbTypeaheadModule,
    RenderFormsModule
  ]
})
export class RenderFormPocModule {
}
