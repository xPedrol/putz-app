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
import {PutzSmartVideoLgpdComponent} from "./putz-smart-video-lgpd.component";
import {CsaBannerComponent} from "./csa-banner/csa-banner.component";
import {CsaFeaturesComponent} from "./csa-features/csa-features.component";
import {CsaServicesComponent} from "./csa-services/csa-services.component";
import {CsaAboutComponent} from "./csa-about/csa-about.component";
import {CsaWhyChooseUsComponent} from "./csa-why-choose-us/csa-why-choose-us.component";
import {CsaFunfactsComponent} from "./csa-funfacts/csa-funfacts.component";
import {CsaPartnerComponent} from "./csa-partner/csa-partner.component";
import {CsaTechnologyCompanyComponent} from "./csa-technology-company/csa-technology-company.component";
import {CsaFeedbackComponent} from "./csa-feedback/csa-feedback.component";
import {CsaCtaComponent} from "./csa-cta/csa-cta.component";
import {CsaContactComponent} from "./csa-contact/csa-contact.component";

@NgModule({
  declarations: [
    PutzSmartVideoLgpdComponent,
    CsaBannerComponent,
    CsaFeaturesComponent,
    CsaServicesComponent,
    CsaAboutComponent,
    CsaWhyChooseUsComponent,
    CsaFunfactsComponent,
    CsaPartnerComponent,
    CsaTechnologyCompanyComponent,
    CsaFeedbackComponent,
    CsaCtaComponent,
    CsaContactComponent,
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
export class PutzSmartVideoLgpdModule { }
