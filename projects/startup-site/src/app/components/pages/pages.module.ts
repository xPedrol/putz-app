import { TabsModule } from 'ngx-tabset';
import { NgModule } from '@angular/core';
import { AccordionModule } from "ngx-accordion";
import { StickyNavModule } from 'ng2-sticky-nav';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { PagesRoutingModule } from './pages-routing.module';

import {CommonStartupModule} from "../../common/common-startup.module";
import {CommonModule} from "@angular/common";
import {TermsConditionsComponent} from "./terms-conditions/terms-conditions.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {PageComponentsModule} from "../pages-components/page-components.module";
import {PutzSmartVideoModule} from "./putz-smart-video/putz-smart-video.module";
import {PutzEpaModule} from "./putz-epa/putz-epa.module";
import {PutzPlataformModule} from "./putz-plataform/putz-plataform.module";
import {PutzStartupModule} from "./putz-startup/putz-startup.module";
import {PutzSmartVideoLgpdModule} from "./putz-smart-video-lgpd/putz-smart-video-lgpd.module";
import {PutzProdutoraDiferenciaisModule} from "./putz-produtora-diferenciais/putz-produtora-diferenciais.module";
import {ClientesPortifolioModule} from "./clientes-portifolio/clientes-portifolio.module";
import {PutzProdutoraTecnologiaModule} from "./putz-produtora-tecnologia/putz-produtora-tecnologia.module";
import {PutzProdutoraVarejoModule} from "./putz-produtora-varejo/putz-produtora-varejo.module";
import {RenderFormsModule} from "../render-forms/render-forms.module";

@NgModule({
    declarations: [
      TermsConditionsComponent,
      PrivacyPolicyComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        CarouselModule,
        StickyNavModule,
        NgxSmartModalModule.forRoot(),
        NgxScrollTopModule,
        TabsModule.forRoot(),
        CommonStartupModule,
        AccordionModule,
        PageComponentsModule,
        PutzSmartVideoModule,
        PutzPlataformModule,
        PutzStartupModule,
        PutzSmartVideoLgpdModule,
        PutzProdutoraDiferenciaisModule,
        ClientesPortifolioModule,
        PutzProdutoraTecnologiaModule,
        PutzProdutoraVarejoModule,
        PutzEpaModule,
        RenderFormsModule
    ],
    providers: [],
    bootstrap: []
})
export class PagesModule { }
