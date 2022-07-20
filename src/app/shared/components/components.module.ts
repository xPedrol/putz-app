import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SimpleNotFoundComponent} from './not-founds/simple-not-found/simple-not-found.component';
import {TableBaseComponent} from './table-base/table-base.component';
import {NebularModule} from '../nebular-components/nebular.module';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {ApiOfflineComponent} from './api-offline/api-offline.component';
import {FileSizeWarningComponent} from './file-size-warning/file-size-warning.component';
import {NgxMaskModule} from 'ngx-mask';
import {PageNotFoundComponent} from './not-founds/page-not-found/page-not-found.component';
import {DetailedNotFoundComponent} from './not-founds/detailed-not-found/detailed-not-found.component';
import {RouterModule} from '@angular/router';
import { InvalidAccountComponent } from './invalid-account/invalid-account.component';


@NgModule({
  declarations: [
    SimpleNotFoundComponent,
    TableBaseComponent,
    ConfirmDialogComponent,
    ApiOfflineComponent,
    FileSizeWarningComponent,
    PageNotFoundComponent,
    DetailedNotFoundComponent,
    InvalidAccountComponent
  ],
  imports: [
    CommonModule,
    NebularModule,
    NgxMaskModule,
    RouterModule
  ],
  exports: [
    SimpleNotFoundComponent,
    TableBaseComponent,
    PageNotFoundComponent,
    DetailedNotFoundComponent
  ]
})
export class ComponentsModule {
}
