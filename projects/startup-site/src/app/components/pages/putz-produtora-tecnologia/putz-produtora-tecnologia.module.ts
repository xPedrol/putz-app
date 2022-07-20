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
import {PutzProdutoraTecnologiaComponent} from "./putz-produtora-tecnologia.component";
import {IaBannerComponent} from "./ia-banner/ia-banner.component";
import {IaServicesComponent} from "./ia-services/ia-services.component";
import {IaFeaturesComponent} from "./ia-features/ia-features.component";
import {IaWhyChooseUsComponent} from "./ia-why-choose-us/ia-why-choose-us.component";
import {IaFeedbackComponent} from "./ia-feedback/ia-feedback.component";
import {IaBlogComponent} from "./ia-blog/ia-blog.component";
import {IaContactComponent} from "./ia-contact/ia-contact.component";
import {RenderFormGaloModule} from "../../render-forms/render-form-galo/render-form-galo.module";

@NgModule({
  declarations: [
    PutzProdutoraTecnologiaComponent,
    IaBannerComponent,
    IaServicesComponent,
    IaFeaturesComponent,
    IaWhyChooseUsComponent,
    IaFeedbackComponent,
    IaBlogComponent,
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
    providers: [],
    bootstrap: []
})
export class PutzProdutoraTecnologiaModule { }
