import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCaseTableComponent } from './project-case-table/project-case-table.component';
import {DirectivesModule} from '../../../directives/directives.module';
import {NbButtonModule, NbCheckboxModule, NbIconModule, NbTagModule, NbTooltipModule} from '@nebular/theme';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {RouterModule} from '@angular/router';
import {NbSecurityModule} from '@nebular/security';



@NgModule({
    declarations: [
        ProjectCaseTableComponent
    ],
    exports: [
        ProjectCaseTableComponent
    ],
  imports: [
    CommonModule,
    DirectivesModule,
    NbIconModule,
    NbTagModule,
    PipeModule,
    NbTooltipModule,
    NbCheckboxModule,
    NbButtonModule,
    RouterModule,
    NbSecurityModule
  ]
})
export class ProjectCaseBasicSharedModule { }
