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
import {EleicoesBannerComponent} from "./eleicoes-banner/eleicoes-banner.component";
import {IaServicesComponent} from "./ia-services/ia-services.component";
import {IaFeaturesComponent} from "./ia-features/ia-features.component";
import {IaWhyChooseUsComponent} from "./ia-why-choose-us/ia-why-choose-us.component";
import {IaFeedbackComponent} from "./ia-feedback/ia-feedback.component";
import {IaContactComponent} from "./ia-contact/ia-contact.component";

import {PutzProdutoraEleicoesComponent} from "./putz-produtora-eleicoes.component";
import {RenderFormGaloModule} from "../../render-forms/render-form-galo/render-form-galo.module";

@NgModule({
  declarations: [
    PutzProdutoraEleicoesComponent,
    EleicoesBannerComponent,
    IaServicesComponent,
    IaFeaturesComponent,
    IaWhyChooseUsComponent,
    IaFeedbackComponent,
    IaContactComponent,
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
        CommonStartupModule,
        RenderFormGaloModule
    ],
    exports: [ EleicoesBannerComponent
    ],
    providers: [ ],
    bootstrap: []
})
export class PutzProdutoraEleicoesModule { }
