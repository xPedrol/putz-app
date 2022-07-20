import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseHeroComponent} from './base-hero/base-hero.component';
import {
  NbButtonModule,
  NbContextMenuModule,
  NbIconModule,
  NbMenuModule,
  NbSelectModule,
  NbUserModule
} from '@nebular/theme';
import {RouterModule} from '@angular/router';
import {EvaComponent} from './eva/eva.component';
import {ComponentsPromoComponent} from './components-promo/components-promo.component';
import {TextCardComponent} from './text-card/text-card.component';
import {HeroFooterComponent} from './hero-footer/hero-footer.component';
import {HeroHeaderComponent} from './hero-header/hero-header.component';
import {BaseHeroComponentsSharedModule} from "./base-hero-components-shared.module";


@NgModule({
  declarations: [
    BaseHeroComponent,
    EvaComponent,
    ComponentsPromoComponent,
    TextCardComponent,
    HeroFooterComponent,
    HeroHeaderComponent
  ],
  exports: [
    BaseHeroComponent,
    EvaComponent,
    ComponentsPromoComponent,
    TextCardComponent,
    HeroFooterComponent,
    HeroHeaderComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
    RouterModule,
    NbButtonModule,
    NbMenuModule,
    NbSelectModule,
    BaseHeroComponentsSharedModule,
    NbUserModule,
    NbContextMenuModule
  ]
})
export class BaseHeroSharedModule {
}
