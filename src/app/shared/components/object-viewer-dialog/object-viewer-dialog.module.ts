import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectViewerDialogComponent } from './object-viewer-dialog/object-viewer-dialog.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbTooltipModule} from "@nebular/theme";
import {ComponentsModule} from "../components.module";



@NgModule({
  declarations: [
    ObjectViewerDialogComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    NbTooltipModule,
    ComponentsModule
  ]
})
export class ObjectViewerDialogModule { }
