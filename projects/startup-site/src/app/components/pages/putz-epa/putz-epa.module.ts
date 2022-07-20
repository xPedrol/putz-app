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
import {CaFeedbackComponent} from "./ca-feedback/ca-feedback.component";
import {CaServicesComponent} from "./ca-services/ca-services.component";
import {CaAboutComponent} from "./ca-about/ca-about.component";
import {CaBannerComponent} from "./ca-banner/ca-banner.component";
// import {CaContactComponent} from "./ca-contact/ca-contact.component";
import {PutzEpaComponent} from "./putz-epa.component";

@NgModule({
  declarations: [
    PutzEpaComponent,
    CaFeedbackComponent,
    CaServicesComponent,
    CaAboutComponent,
    CaBannerComponent,
    // CaContactComponent,
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
export class PutzEpaModule { }
