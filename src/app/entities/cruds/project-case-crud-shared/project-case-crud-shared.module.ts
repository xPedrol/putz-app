import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectCaseCrudDashboardComponent} from './project-case-crud-dashboard/project-case-crud-dashboard.component';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbOptionModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTagModule,
  NbTooltipModule
} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../../shared/pagination-wrap/pagination-wrap.module';
import {ComponentsModule} from '../../../shared/components/components.module';
import {RouterModule} from '@angular/router';
import {NbSecurityModule} from '@nebular/security';
import {
  ProjectCaseBasicSharedModule
} from '../../project-case-shared/project-case-basic-shared/project-case-basic-shared.module';
import {ProjectCaseCrudUpdateComponent} from './project-case-crud-update/project-case-crud-update.component';


@NgModule({
  declarations: [
    ProjectCaseCrudDashboardComponent,
    ProjectCaseCrudUpdateComponent
  ],
    imports: [
        CommonModule,
        NbTagModule,
        NbCardModule,
        NbFormFieldModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbInputModule,
        NgbPaginationModule,
        PaginationWrapModule,
        NbOptionModule,
        ComponentsModule,
        NbSelectModule,
        NbSpinnerModule,
        RouterModule,
        NbSecurityModule,
        NbIconModule,
        ProjectCaseBasicSharedModule,
        NbTooltipModule
    ]
})
export class ProjectCaseCrudSharedModule { }
