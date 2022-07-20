import { TabsModule } from 'ngx-tabset';
import { NgModule } from '@angular/core';
import { AccordionModule } from "ngx-accordion";
import { StickyNavModule } from 'ng2-sticky-nav';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import {CommonModule} from "@angular/common";
import {PageComponentsModule} from "../../pages-components/page-components.module";

import {CommonStartupModule} from "../../../common/common-startup.module";
import {
  PutzProdutoraVarejoComponent
} from "./putz-produtora-varejo.component";
import {MaBannerComponent} from "./ma-banner/ma-banner.component";
import {MaServicesComponent} from "./ma-services/ma-services.component";
import {MaFunfactsComponent} from "./ma-funfacts/ma-funfacts.component";
import {MaCtaComponent} from "./ma-cta/ma-cta.component";
import {MaContactComponent} from "./ma-contact/ma-contact.component";
import {MaCasosPetzComponent} from "./ma-casos-petz/ma-casos-petz.component";
import {MaCasosAmericanasComponent} from "./ma-casos-americanas/ma-casos-americanas.component";
import {MaCasosPrivaliaComponent} from "./ma-casos-privalia/ma-casos-privalia.component";

@NgModule({
  declarations: [
    PutzProdutoraVarejoComponent,
    MaBannerComponent,
    MaServicesComponent,
    MaCasosPetzComponent,
    MaCasosAmericanasComponent,
    MaCasosPrivaliaComponent,
    MaFunfactsComponent,
    MaCtaComponent,
    MaContactComponent,
  ],
    imports: [
        CommonModule,
        CarouselModule,
        StickyNavModule,
        NgxSmartModalModule.forRoot(),
        NgxScrollTopModule,
        TabsModule.forRoot(),
        AccordionModule,
        PageComponentsModule,
        CommonStartupModule
    ],
    providers: [],
    bootstrap: []
})
export class PutzProdutoraVarejoModule { }
