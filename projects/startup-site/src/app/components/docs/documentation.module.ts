/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {NgModule} from '@angular/core';
// import { NgdBlocksModule } from '../blocks/blocks.module';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbSpinnerModule
} from '@nebular/theme';

import {NgdDocumentationRoutingModule} from './documentation-routing.module';
import {NgdPageComponent} from './components/page/page.component';
import {NgdDocumentationComponent} from './documentation.component';
// import {BaseHeroSharedModule} from '../../entities/base-hero-shared/base-hero-shared.module';
// import {ThemesModule} from '../../core/themes.module';

import {NgdPageTocComponent} from './components/page-toc/page-toc.component';
import {NgdFragmentTargetDirective} from './components/fragment-target/fragment-target.directive';
import {NgdMdBLockComponent} from './components/md-block/md-block.component';
import {NgdPagerBlockComponent} from './components/pager-block/pager-block.component';
import {CommonModule} from '@angular/common';
import {FaqMenuComponent} from './components/faq-menu/faq-menu.component';
import {NgdMenuService} from "./services/menu.service";
import {NgdStructureService} from "./services/structure.service";
import {NgdArticleService} from "./services/article.service";
import {NgdTextService} from "./services/text.service";
import {NgdPaginationService} from "./services/pagination.service";
import {NgdLastViewedSectionService} from "./services/last-viewed-section.service";
import {NgdVisibilityService} from "./services/visibility.service";
import {Title} from "@angular/platform-browser";
import {STRUCTURE} from "./services/app.options";
import {structure} from "./structure";

@NgModule({
    imports: [
        CommonModule,
        NgdDocumentationRoutingModule,
        // ThemesModule,
        NbCardModule,
        NbLayoutModule,
        // BaseHeroSharedModule,
        NbIconModule, NbSpinnerModule,
        NbSidebarModule,
        NbMenuModule, NbButtonModule,

        // RouterModule, , , ,
    ],
  declarations: [
    NgdPageComponent,
    NgdDocumentationComponent,
    NgdPageTocComponent,
    NgdMdBLockComponent,
    NgdFragmentTargetDirective,
    NgdPagerBlockComponent,
    FaqMenuComponent
  ],
  providers: [
    Title, { provide: STRUCTURE, useValue: structure },
    NgdMenuService,
    NgdStructureService,
    NgdArticleService,
    NgdTextService,
    NgdPaginationService,
    NgdLastViewedSectionService,
    NgdVisibilityService
  ],
})
export class NgdDocumentationModule {
}
