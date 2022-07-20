import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostumerPagesSubHeaderComponent } from './costumer-pages-sub-header/costumer-pages-sub-header.component';
import {NbContextMenuModule} from '@nebular/theme';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [
        CostumerPagesSubHeaderComponent
    ],
    exports: [
        CostumerPagesSubHeaderComponent
    ],
  imports: [
    CommonModule,
    NbContextMenuModule,
    RouterModule
  ]
})
export class CostumerPagesLayoutComponentsModule { }
