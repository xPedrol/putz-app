import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceDashboardComponent } from './competence-dashboard/competence-dashboard.component';
import { CompetenceCardComponent } from './competence-card/competence-card.component';
import {SharedModule} from '../../shared/shared.module';
import {PipeModule} from '../../core/pipes/pipe.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../shared/pagination-wrap/pagination-wrap.module';



@NgModule({
  declarations: [
    CompetenceDashboardComponent,
    CompetenceCardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    PipeModule,
    RouterModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    PaginationWrapModule
  ]
})
export class CompetenceSharedModule { }
