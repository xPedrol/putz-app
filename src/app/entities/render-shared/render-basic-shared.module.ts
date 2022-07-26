import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ProjectRenderErrorsDialogComponent
} from "./project-render-errors-dialog/project-render-errors-dialog.component";
import {NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule} from "@nebular/theme";
import {ComponentsModule} from "../../shared/components/components.module";


@NgModule({
  declarations: [
    ProjectRenderErrorsDialogComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    ComponentsModule,
    NbButtonModule
  ],
  exports: [
    ProjectRenderErrorsDialogComponent
  ]
})
export class RenderBasicSharedModule {
}
