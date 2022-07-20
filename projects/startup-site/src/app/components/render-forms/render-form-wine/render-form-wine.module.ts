import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormWineDetailComponent} from './render-form-wine-detail/render-form-wine-detail.component';
import {RenderFormWineFieldsComponent} from './render-form-wine-fields/render-form-wine-fields.component';
import {RenderFormsConfigModule} from "../../render-forms-config/render-forms-config.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {PipeModule} from "../../../../../../../src/app/core/pipes/pipe.module";
import {RouterModule, Routes} from "@angular/router";
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {path: '', component: RenderFormWineDetailComponent},
  {path: 'forms', component: RenderFormWineDetailComponent}
];

@NgModule({
  declarations: [
    RenderFormWineDetailComponent,
    RenderFormWineFieldsComponent
  ],
    imports: [
        CommonModule,
        RenderFormsConfigModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgxMaskModule,
        PipeModule,
        NgbTypeaheadModule
    ]
})
export class RenderFormWineModule {
}
