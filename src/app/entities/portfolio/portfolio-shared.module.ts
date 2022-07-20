import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioDashboardComponent} from './portfolio-dashboard/portfolio-dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CompetenceGuideSharedModule} from '../competence-guide-shared/competence-guide-shared.module';
import {RouterModule} from '@angular/router';
import {DirectivesModule} from '../../directives/directives.module';
import {PipeModule} from '../../core/pipes/pipe.module';
import {PortfolioDetailComponent} from './portfolio-detail/portfolio-detail.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {SharedModule} from '../../shared/shared.module';
import {PortfolioInfoDialogComponent} from './portfolio-info-dialog/portfolio-info-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../shared/pagination-wrap/pagination-wrap.module';
import {PortfolioBasicSharedModule} from "./portfolio-basic-shared.module";


@NgModule({
  declarations: [
    PortfolioDashboardComponent,
    PortfolioDetailComponent,
    PortfolioInfoDialogComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    NgxDropzoneModule,
    CompetenceGuideSharedModule,
    SharedModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    DirectivesModule,
    PortfolioBasicSharedModule,
    RouterModule,
    TranslateModule,
    PaginationWrapModule
  ],
  exports: [
    PortfolioDashboardComponent,
    PortfolioBasicSharedModule
  ]
})
export class PortfolioSharedModule {
}
