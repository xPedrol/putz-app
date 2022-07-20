import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardStatusCardComponent} from "./dashboard-status-card/dashboard-status-card.component";
import {
  DashboardGuidedTourDialogComponent
} from "./dashboard-guided-tour-dialog/dashboard-guided-tour-dialog.component";
import {NbButtonModule, NbCardModule, NbStepperModule} from "@nebular/theme";



@NgModule({
  declarations: [
    DashboardStatusCardComponent,
    DashboardGuidedTourDialogComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbStepperModule,
    NbButtonModule
  ],
  exports:[
    DashboardStatusCardComponent,
    DashboardGuidedTourDialogComponent
  ]
})
export class DashboardSharedModule { }
