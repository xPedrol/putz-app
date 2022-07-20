import { TabsModule } from 'ngx-tabset';
import { NgModule } from '@angular/core';
import { AccordionModule } from "ngx-accordion";
import { StickyNavModule } from 'ng2-sticky-nav';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import {CommonModule} from "@angular/common";
import {PageComponentsModule} from "../../pages-components/page-components.module";

import {PutzSmartVideoComponent} from "./putz-smart-video.component";
import {SaBannerComponent} from "./sa-banner/sa-banner.component";
import {SaServicesComponent} from "./sa-services/sa-services.component";
import {SaPlatformComponent} from "./sa-platform/sa-platform.component";
import {SaFeedbackComponent} from "./sa-feedback/sa-feedback.component";
import {CommonStartupModule} from "../../../common/common-startup.module";

@NgModule({
  declarations: [
    PutzSmartVideoComponent,
    SaBannerComponent,
    SaServicesComponent,
    SaPlatformComponent,
    SaFeedbackComponent,
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
export class PutzSmartVideoModule { }
