import { NgModule } from '@angular/core';

import {CarouselModule} from "ngx-owl-carousel-o";
import {PortifolioGridComponent} from "./portifolio-grid/portifolio-grid.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ContactsPutzComponent} from "./contacts-putz/contacts-putz.component";
import {FeedbackPostsComponent} from "./feedback-posts/feedback-posts.component";

@NgModule({
    exports: [
      PortifolioGridComponent,
      ContactsPutzComponent,
      FeedbackPostsComponent
    ],
    declarations: [
      PortifolioGridComponent,
      ContactsPutzComponent,
      FeedbackPostsComponent
    ],
    imports: [
        CommonModule,
        CarouselModule,
        RouterModule,
    ],
    providers: [],
    bootstrap: []
})
export class PageComponentsModule { }
