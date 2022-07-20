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
import {PutzProdutoraDiferenciaisComponent} from "./putz-produtora-diferenciais.component";
import {AsBannerComponent} from "./as-banner/as-banner.component";
import {AsPartnerComponent} from "./as-partner/as-partner.component";
import {AsAboutComponent} from "./as-about/as-about.component";
import {AsFunfactsComponent} from "./as-funfacts/as-funfacts.component";
import {AsFeaturesComponent} from "./as-features/as-features.component";
import {AsScreenshotsComponent} from "./as-screenshots/as-screenshots.component";
import {AsAppDownloadComponent} from "./as-app-download/as-app-download.component";
import {AsFeedbackComponent} from "./as-feedback/as-feedback.component";
import {AsPricingComponent} from "./as-pricing/as-pricing.component";
import {AsFaqComponent} from "./as-faq/as-faq.component";

@NgModule({
  declarations: [
    PutzProdutoraDiferenciaisComponent,
    AsBannerComponent,
    AsPartnerComponent,
    AsAboutComponent,
    AsFunfactsComponent,
    AsFeaturesComponent,
    AsScreenshotsComponent,
    AsAppDownloadComponent,
    AsFeedbackComponent,
    AsPricingComponent,
    AsFaqComponent,
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
export class PutzProdutoraDiferenciaisModule { }
