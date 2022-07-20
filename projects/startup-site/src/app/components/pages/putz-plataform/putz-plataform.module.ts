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
import {PutzPlataformComponent} from "./putz-plataform.component";
import {SsBannerComponent} from "./ss-banner/ss-banner.component";
import {SsFeaturesComponent} from "./ss-features/ss-features.component";
import {SsAppDownloadComponent} from "./ss-app-download/ss-app-download.component";
import {SsFaqComponent} from "./ss-faq/ss-faq.component";
import {SsFeedbackComponent} from "./ss-feedback/ss-feedback.component";
import {SsFunfactsVideoComponent} from "./ss-funfacts-video/ss-funfacts-video.component";
import {SsServicesComponent} from "./ss-services/ss-services.component";
import {SsPartnerComponent} from "./ss-partner/ss-partner.component";
import {SsScreenshotsComponent} from "./ss-screenshots/ss-screenshots.component";

@NgModule({
  declarations: [
    PutzPlataformComponent,
    SsBannerComponent,
    SsFeaturesComponent,
    SsAppDownloadComponent,
    SsFaqComponent,
    SsFeedbackComponent,
    SsFunfactsVideoComponent,
    SsServicesComponent,
    SsPartnerComponent,
    SsScreenshotsComponent,
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
export class PutzPlataformModule { }
