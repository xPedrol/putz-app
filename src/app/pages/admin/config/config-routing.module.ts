import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigComponent} from '../../../entities/config-shared/config/config.component';
import {ConfigTablesComponent} from "../../../entities/config-shared/config-tables/config-tables.component";
import {ConfigButtonsComponent} from "../../../entities/config-shared/config-buttons/config-buttons.component";

const routes: Routes = [
  {
    path: '',
    component: ConfigComponent,
    children: [
      {
        path: '',
        component: ConfigTablesComponent
      },
      {
        path: 'tables',
        component: ConfigTablesComponent
      },
      {
        path: 'buttons',
        component: ConfigButtonsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule {
}
