import {NgModule} from '@angular/core';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule
} from '@nebular/theme';
import {NbMomentDateModule} from '@nebular/moment';

const status = '';
const NB_MODULES = [
  NbThemeModule.forRoot(
    {name: 'default'},
  ),
  NbMenuModule.forRoot(),
  NbSidebarModule.forRoot(),
  NbDialogModule.forRoot(),
  NbWindowModule.forRoot(),
  NbDatepickerModule.forRoot(),
  NbMomentDateModule,
  NbToastrModule.forRoot({preventDuplicates: true, duplicatesBehaviour: 'all', status, duration: 5500})
];

@NgModule({
  imports: [NB_MODULES],
  exports: [NB_MODULES],
  providers: [
    // LayoutService
  ]
})
export class ThemesModule {
}
