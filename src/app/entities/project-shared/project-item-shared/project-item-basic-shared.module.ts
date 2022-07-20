import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemDetailDialogComponent } from './project-item-detail-dialog/project-item-detail-dialog.component';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule, NbListModule,
  NbSpinnerModule,
  NbTagModule,
  NbTooltipModule
} from "@nebular/theme";
import {PipeModule} from "../../../core/pipes/pipe.module";
import { ProjectItemCardComponent } from './project-item-card/project-item-card.component';
import {RouterModule} from "@angular/router";
import {NbSecurityModule} from "@nebular/security";
import {TranslateModule} from "@ngx-translate/core";
import { ProjectItemFreelancerCardComponent } from './project-item-freelancer-card/project-item-freelancer-card.component';
import {ComponentsModule} from "../../../shared/components/components.module";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    ProjectItemDetailDialogComponent,
    ProjectItemCardComponent,
    ProjectItemFreelancerCardComponent
  ],
  exports: [
    ProjectItemCardComponent,
    ProjectItemFreelancerCardComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    PipeModule,
    NbSpinnerModule,
    NbTagModule,
    RouterModule,
    NbSecurityModule,
    TranslateModule,
    NbTooltipModule,
    NbBadgeModule,
    ComponentsModule,
    NbListModule,
    NgbRatingModule
  ]
})
export class ProjectItemBasicSharedModule { }
