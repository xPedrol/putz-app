import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormGaloDetailComponent} from './render-form-galo-detail/render-form-galo-detail.component';
import {RenderFormGaloFieldsComponent} from './render-form-galo-fields/render-form-galo-fields.component';
import {RenderFormsConfigModule} from '../../render-forms-config/render-forms-config.module';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {RenderFormsModule} from "../render-forms.module";

const routes: Routes = [
  {path: '', component: RenderFormGaloDetailComponent},
  {path: 'forms', component: RenderFormGaloDetailComponent}
];

@NgModule({
  declarations: [
    RenderFormGaloDetailComponent,
    RenderFormGaloFieldsComponent
  ],
  exports: [
    RenderFormGaloDetailComponent
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
export class RenderFormGaloModule {
}
