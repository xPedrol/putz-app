import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceGuideCrudTableComponent } from './competence-guide-crud-table/competence-guide-crud-table.component';
import {DirectivesModule} from '../../../../directives/directives.module';
import {SharedModule} from '../../../../shared/shared.module';
import {PipeModule} from '../../../../core/pipes/pipe.module';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [
        CompetenceGuideCrudTableComponent
    ],
    exports: [
        CompetenceGuideCrudTableComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    DirectivesModule,
    PipeModule,
    RouterModule
  ]
})
export class CompetenceGuideCrudListSharedModule { }
