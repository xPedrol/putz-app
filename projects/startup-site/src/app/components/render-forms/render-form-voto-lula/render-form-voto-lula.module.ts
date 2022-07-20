import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RenderFormVotoLulaDetailComponent} from './render-form-voto-lula-detail/render-form-voto-lula-detail.component';
import {RenderFormVotoLulaFieldsComponent} from './render-form-voto-lula-fields/render-form-voto-lula-fields.component';
import {RenderFormsConfigModule} from "../../render-forms-config/render-forms-config.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {RouterModule, Routes} from "@angular/router";
import {NgbAccordionModule, NgbAlertModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {ImageCropperHandleModule} from "../../image-cropper/image-cropper-handle.module";
import {PtBannerComponent} from "./eu-voto-lula/pt-banner/pt-banner.component";
import {EuVotoLulaComponent} from "./eu-voto-lula/eu-voto-lula.component";
import {CarouselModule} from "ngx-owl-carousel-o";
import {StickyNavModule} from "ng2-sticky-nav";
import {NgxSmartModalModule} from "ngx-smart-modal";
import {NgxScrollTopModule} from "ngx-scrolltop";
import {TabsModule} from "ngx-tabset";
import {AccordionModule} from "ngx-accordion";
import {PageComponentsModule} from "../../pages-components/page-components.module";
import {CommonStartupModule} from "../../../common/common-startup.module";
import {PtComoUsarComponent} from "./eu-voto-lula/pt-como-usar/pt-como-usar.component";

const routes: Routes = [
  {path: '', component: EuVotoLulaComponent},
  {path: 'forms', component: RenderFormVotoLulaDetailComponent},
];


@NgModule({
  declarations: [
    RenderFormVotoLulaDetailComponent,
    RenderFormVotoLulaFieldsComponent,
    EuVotoLulaComponent,
    PtBannerComponent,
    PtComoUsarComponent,
    // MaServicesComponent,
    // MaCasosAmericanasComponent,
    // MaFunfactsComponent,
    // MaCtaComponent,
    // MaContactComponent,
  ],
    exports: [
        RenderFormVotoLulaDetailComponent,
        RenderFormVotoLulaFieldsComponent,
        PtComoUsarComponent
    ],
  imports: [
    CommonModule,
    RenderFormsConfigModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxMaskModule,
    NgbTypeaheadModule,
    NgbAccordionModule,
    ImageCropperHandleModule,
    NgbAlertModule

    // CarouselModule,
    // StickyNavModule,
    // NgxSmartModalModule.forRoot(),
    // NgxScrollTopModule,
    // TabsModule.forRoot(),
    // AccordionModule,
    // PageComponentsModule,
    // CommonStartupModule,
    // RenderFormVotoLulaModule
  ]
})
export class RenderFormVotoLulaModule {
}
