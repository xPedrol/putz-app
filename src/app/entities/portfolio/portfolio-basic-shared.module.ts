import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  PortfolioBasicCardComponent
} from "./portfolio-basic-card/portfolio-basic-card.component";
import {PortfolioCardListComponent} from "./portfolio-card-list/portfolio-card-list.component";
import {PortfolioTableComponent} from "./portfolio-table/portfolio-table.component";
import {SharedModule} from "../../shared/shared.module";
import {PipeModule} from "../../core/pipes/pipe.module";
import {RouterModule} from "@angular/router";
import {DirectivesModule} from "../../directives/directives.module";
import {TranslateModule} from "@ngx-translate/core";
import { PortfolioFilterDialogComponent } from './portfolio-filter-dialog/portfolio-filter-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PortfolioBasicCardComponent,
    PortfolioCardListComponent,
    PortfolioTableComponent,
    PortfolioFilterDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipeModule,
    RouterModule,
    DirectivesModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [
    PortfolioBasicCardComponent,
    PortfolioCardListComponent,
    PortfolioTableComponent,
    PortfolioFilterDialogComponent
  ]
})
export class PortfolioBasicSharedModule {
}
