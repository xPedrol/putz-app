import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {SubHeaderComponent} from './sub-header/sub-header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {
    NbActionsModule, NbButtonGroupModule,
    NbButtonModule,
    NbCardModule,
    NbContextMenuModule,
    NbIconModule,
    NbListModule,
    NbMenuModule,
    NbPopoverModule,
    NbSpinnerModule,
    NbTagModule,
    NbTooltipModule,
    NbUserModule
} from '@nebular/theme';
import {PipeModule} from '../../../core/pipes/pipe.module';
import {NbSecurityModule} from '@nebular/security';
import {GuidedTourService} from '../../../../../projects/guided-tour/src/lib/guided-tour.service';


@NgModule({
  declarations: [
    HeaderComponent,
    SubHeaderComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    SubHeaderComponent,
    SidebarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        NbActionsModule,
        NbContextMenuModule,
        NbPopoverModule,
        NbUserModule,
        NbCardModule,
        NbIconModule,
        NbListModule,
        NbSpinnerModule,
        PipeModule,
        NbTagModule,
        NbButtonModule,
        NbMenuModule,
        NbTooltipModule,
        NbSecurityModule,
        NbButtonGroupModule
    ],
  providers: [GuidedTourService],
})
export class MainAppLayoutComponentModule {
}
