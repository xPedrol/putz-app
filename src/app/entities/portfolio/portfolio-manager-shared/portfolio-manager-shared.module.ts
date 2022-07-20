import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioManagerComponent} from './portfolio-manager/portfolio-manager.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginationWrapModule} from '../../../shared/pagination-wrap/pagination-wrap.module';
import {PortfolioBasicSharedModule} from "../portfolio-basic-shared.module";


@NgModule({
  declarations: [
    PortfolioManagerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    PortfolioBasicSharedModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    PipeModule,
    PaginationWrapModule
  ],
  exports: [
    PortfolioManagerComponent
  ]
})
export class PortfolioManagerSharedModule {
}
