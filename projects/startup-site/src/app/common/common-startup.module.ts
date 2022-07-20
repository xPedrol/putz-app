import { NgModule } from '@angular/core';

import { PartnerComponent } from './partner/partner.component';
import { CtaComponent } from './cta/cta.component';
import { WorkProcessComponent } from './work-process/work-process.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FunfactsComponent } from './funfacts/funfacts.component';
import { InstagramComponent } from './instagram/instagram.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { EmptyComponent } from "./empty/empty.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
    exports: [
      CtaComponent,
      EmptyComponent,
      FunfactsComponent,
      InstagramComponent,
      NotFoundComponent,
      PartnerComponent,
      SubscribeComponent,
      WorkProcessComponent,
    ],
    declarations: [
      CtaComponent,
      EmptyComponent,
      FunfactsComponent,
      InstagramComponent,
      NotFoundComponent,
      PartnerComponent,
      SubscribeComponent,
      WorkProcessComponent,
    ],
    imports: [
        CommonModule,
        CarouselModule,
        RouterModule
    ],
    providers: [],
    bootstrap: []
})
export class CommonStartupModule { }
