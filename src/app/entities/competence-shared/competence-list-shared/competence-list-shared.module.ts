import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceTableComponent } from './competence-table/competence-table.component';
import {DirectivesModule} from '../../../directives/directives.module';
import {SharedModule} from '../../../shared/shared.module';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [
        CompetenceTableComponent
    ],
    exports: [
        CompetenceTableComponent
    ],
  imports: [
    CommonModule,
    DirectivesModule,
    SharedModule,
    PipeModule,
    RouterModule
  ]
})
export class CompetenceListSharedModule { }
