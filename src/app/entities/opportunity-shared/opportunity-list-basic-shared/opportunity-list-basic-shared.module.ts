import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpportunityCardComponent} from './opportunity-card/opportunity-card.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbTagModule, NbTooltipModule} from '@nebular/theme';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    OpportunityCardComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbTagModule,
    PipeModule,
    NbIconModule,
    NbButtonModule,
    RouterModule,
    TranslateModule,
    NbTooltipModule
  ],
  exports: [
    OpportunityCardComponent
  ]
})
export class OpportunityListBasicSharedModule {
}
