import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigComponent} from './config/config.component';
import {FormsModule} from '@angular/forms';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbRouteTabsetModule} from '@nebular/theme';
import {DirectivesModule} from '../../directives/directives.module';
import { ConfigTablesComponent } from './config-tables/config-tables.component';
import { ConfigButtonsComponent } from './config-buttons/config-buttons.component';


@NgModule({
  declarations: [
    ConfigComponent,
    ConfigTablesComponent,
    ConfigButtonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbIconModule,
    NbInputModule,
    DirectivesModule,
    NbCardModule,
    NbRouteTabsetModule,
    NbButtonModule
  ]
})
export class ConfigSharedModule {
}
