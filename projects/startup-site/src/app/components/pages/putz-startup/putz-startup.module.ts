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
import {PutzStartupComponent} from "./putz-startup.component";
import {StaBannerComponent} from "./sta-banner/sta-banner.component";
import {StaFeaturedServicesComponent} from "./sta-featured-services/sta-featured-services.component";
import {StaCaseStudiesComponent} from "./sta-case-studies/sta-case-studies.component";
import {StaQuotesComponent} from "./sta-quotes/sta-quotes.component";
import {StaAboutComponent} from "./sta-about/sta-about.component";

@NgModule({
  declarations: [
    PutzStartupComponent,
    StaBannerComponent,
    StaFeaturedServicesComponent,
    StaCaseStudiesComponent,
    StaQuotesComponent,
    StaAboutComponent,
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
export class PutzStartupModule { }
