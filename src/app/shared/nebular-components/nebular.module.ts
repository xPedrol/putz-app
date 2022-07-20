import {NgModule} from '@angular/core';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbBadgeModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbProgressBarModule, NbRouteTabsetModule,
  NbSearchModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbMomentDateModule} from '@nebular/moment';
import {NbSecurityModule} from '@nebular/security';
import {CustomRouteTabSetModule} from '../custom-route-tab-set/custom-route-tab-set.module';


@NgModule({
  exports:[
    NbLayoutModule,
    NbMenuModule,
    NbCardModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbContextMenuModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbEvaIconsModule,
    NbTabsetModule,
    NbProgressBarModule,
    NbListModule,
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbAutocompleteModule,
    NbBadgeModule,
    NbPopoverModule,
    NbTagModule,
    NbDatepickerModule,
    NbButtonGroupModule,
    NbTooltipModule,
    NbMomentDateModule,
    NbSecurityModule,
    NbAccordionModule,
    NbToggleModule,
    NbRouteTabsetModule,
    CustomRouteTabSetModule,
  ]
})
export class NebularModule { }
