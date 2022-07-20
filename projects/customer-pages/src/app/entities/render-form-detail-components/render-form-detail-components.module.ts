import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderFormDetailHeaderComponent } from './render-form-detail-header/render-form-detail-header.component';
import { RenderFormDetailFooterComponent } from './render-form-detail-footer/render-form-detail-footer.component';
import { RenderFormDetailWrapperComponent } from './render-form-detail-wrapper/render-form-detail-wrapper.component';
import { DetailHeaderTitleComponent } from './render-form-detail-header/detail-header-title/detail-header-title.component';
import { DetailHeaderSubtitleComponent } from './render-form-detail-header/detail-header-subtitle/detail-header-subtitle.component';
import {BaseHeroComponentsSharedModule} from "../base-hero-shared/base-hero-components-shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        RenderFormDetailHeaderComponent,
        RenderFormDetailFooterComponent,
        RenderFormDetailWrapperComponent,
        DetailHeaderTitleComponent,
        DetailHeaderSubtitleComponent
    ],
  exports: [
    RenderFormDetailHeaderComponent,
    RenderFormDetailWrapperComponent,
    DetailHeaderTitleComponent,
    DetailHeaderSubtitleComponent
  ],
  imports: [
    CommonModule,
    BaseHeroComponentsSharedModule,
    RouterModule
  ]
})
export class RenderFormDetailComponentsModule { }
