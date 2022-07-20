import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PutzContractsModule } from '../../shared/putz-contracts/putz-contracts.module';
import { SharedModule } from '../../shared/shared.module';
import { PdfTestComponent } from './pdf-test/pdf-test.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'test',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: PdfTestComponent
  },
  {
    path: 'contract/:projectId',
    component: PdfTestComponent
  }
];

@NgModule({
  declarations: [
    PdfTestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PutzContractsModule,
    RouterModule.forChild(routes)
  ]
})
export class PdfTestModule {
}
