import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RenderFormWrapperComponent} from './render-form-wrapper.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbSpinnerModule,
  NbToggleModule, NbTooltipModule
} from '@nebular/theme';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {ComponentsModule} from '../../../../../../src/app/shared/components/components.module';
import {RenderFormFeedbackCardSharedModule} from '../render-form-feedback-card/render-form-feedback-card-shared.module';
import {NbSecurityModule} from '@nebular/security';
import { NoProjectIdDialogComponent } from './no-project-id-dialog/no-project-id-dialog.component';



@NgModule({
  declarations: [
    RenderFormWrapperComponent,
    NoProjectIdDialogComponent
  ],
  exports:[
    RenderFormWrapperComponent
  ],
    imports: [
        CommonModule,
        NbSpinnerModule,
        NbCardModule,
        NbCheckboxModule,
        NbToggleModule,
        NgxDropzoneModule,
        NbIconModule,
        NbButtonModule,
        NbAlertModule,
        NbTooltipModule,
        ComponentsModule,
        RenderFormFeedbackCardSharedModule,
        NbSecurityModule
    ]
})
export class RenderFormWrapperModule { }
