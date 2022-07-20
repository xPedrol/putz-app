import { TabsModule } from 'ngx-tabset';
import { NgModule } from '@angular/core';
import { AccordionModule } from "ngx-accordion";
import { StickyNavModule } from 'ng2-sticky-nav';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { PagesDemoRoutingModule } from './pages-demo-routing.module';
import { DigitalAgencyDemoComponent } from './digital-agency-demo/digital-agency-demo.component';
import { DaBannerComponent } from './digital-agency-demo/da-banner/da-banner.component';
import { DaServicesComponent } from './digital-agency-demo/da-services/da-services.component';
import { DaAboutComponent } from './digital-agency-demo/da-about/da-about.component';
import { DaWorksComponent } from './digital-agency-demo/da-works/da-works.component';
import { DaFeedbackComponent } from './digital-agency-demo/da-feedback/da-feedback.component';
import { DaTeamComponent } from './digital-agency-demo/da-team/da-team.component';
import { DaFunfactsComponent } from './digital-agency-demo/da-funfacts/da-funfacts.component';
import { DaBlogComponent } from './digital-agency-demo/da-blog/da-blog.component';
import { DaContactComponent } from './digital-agency-demo/da-contact/da-contact.component';
import { CreativeAgencyDemoComponent } from './creative-agency-demo/creative-agency-demo.component';
import { CaBlogComponent } from './creative-agency-demo/ca-blog/ca-blog.component';
import { CaTeamComponent } from './creative-agency-demo/ca-team/ca-team.component';
import { CaPricingComponent } from './creative-agency-demo/ca-pricing/ca-pricing.component';
import { CaFeedbackComponent } from './creative-agency-demo/ca-feedback/ca-feedback.component';
import { CaWorksComponent } from './creative-agency-demo/ca-works/ca-works.component';
import { CaServicesComponent } from './creative-agency-demo/ca-services/ca-services.component';
import { CaAboutComponent } from './creative-agency-demo/ca-about/ca-about.component';
import { CaBannerComponent } from './creative-agency-demo/ca-banner/ca-banner.component';
import { CaContactComponent } from './creative-agency-demo/ca-contact/ca-contact.component';
import { ItAgencyDemoComponent } from './it-agency-demo/it-agency-demo.component';
import { IaBannerComponent } from './it-agency-demo/ia-banner/ia-banner.component';
import { IaServicesComponent } from './it-agency-demo/ia-services/ia-services.component';
import { IaFeaturesComponent } from './it-agency-demo/ia-features/ia-features.component';
import { IaWhyChooseUsComponent } from './it-agency-demo/ia-why-choose-us/ia-why-choose-us.component';
import { IaFeedbackComponent } from './it-agency-demo/ia-feedback/ia-feedback.component';
import { IaTeamComponent } from './it-agency-demo/ia-team/ia-team.component';
import { IaPricingComponent } from './it-agency-demo/ia-pricing/ia-pricing.component';
import { IaBlogComponent } from './it-agency-demo/ia-blog/ia-blog.component';
import { IaContactComponent } from './it-agency-demo/ia-contact/ia-contact.component';
import { MarketingAgencyDemoComponent } from './marketing-agency-demo/marketing-agency-demo.component';
import { MaBannerComponent } from './marketing-agency-demo/ma-banner/ma-banner.component';
import { MaServicesComponent } from './marketing-agency-demo/ma-services/ma-services.component';
import { MaProjectsComponent } from './marketing-agency-demo/ma-projects/ma-projects.component';
import { MaFeedbackComponent } from './marketing-agency-demo/ma-feedback/ma-feedback.component';
import { MaAboutComponent } from './marketing-agency-demo/ma-about/ma-about.component';
import { MaFunfactsComponent } from './marketing-agency-demo/ma-funfacts/ma-funfacts.component';
import { MaCtaComponent } from './marketing-agency-demo/ma-cta/ma-cta.component';
import { MaBlogComponent } from './marketing-agency-demo/ma-blog/ma-blog.component';
import { MaContactComponent } from './marketing-agency-demo/ma-contact/ma-contact.component';
import { PortfolioAgencyDemoComponent } from './portfolio-agency-demo/portfolio-agency-demo.component';
import { PaBannerComponent } from './portfolio-agency-demo/pa-banner/pa-banner.component';
import { PaProjectsComponent } from './portfolio-agency-demo/pa-projects/pa-projects.component';
import { PaFunfactsComponent } from './portfolio-agency-demo/pa-funfacts/pa-funfacts.component';
import { StudioAgencyDemoComponent } from './studio-agency-demo/studio-agency-demo.component';
import { SaFeedbackComponent } from './studio-agency-demo/sa-feedback/sa-feedback.component';
import { SaContactComponent } from './studio-agency-demo/sa-contact/sa-contact.component';
import { SaBlogComponent } from './studio-agency-demo/sa-blog/sa-blog.component';
import { SaAboutComponent } from './studio-agency-demo/sa-about/sa-about.component';
import { SaProjectsComponent } from './studio-agency-demo/sa-projects/sa-projects.component';
import { SaBannerComponent } from './studio-agency-demo/sa-banner/sa-banner.component';
import { SaServicesComponent } from './studio-agency-demo/sa-services/sa-services.component';
import { BusinessAgencyDemoComponent } from './business-agency-demo/business-agency-demo.component';
import { BaContactComponent } from './business-agency-demo/ba-contact/ba-contact.component';
import { BaFeedbackComponent } from './business-agency-demo/ba-feedback/ba-feedback.component';
import { BaTeamComponent } from './business-agency-demo/ba-team/ba-team.component';
import { BaPricingComponent } from './business-agency-demo/ba-pricing/ba-pricing.component';
import { BaWorksComponent } from './business-agency-demo/ba-works/ba-works.component';
import { BaServicesComponent } from './business-agency-demo/ba-services/ba-services.component';
import { BaBannerComponent } from './business-agency-demo/ba-banner/ba-banner.component';
import { BaAboutComponent } from './business-agency-demo/ba-about/ba-about.component';
import { StartupAgencyDemoComponent } from './startup-agency-demo/startup-agency-demo.component';
import { StaBannerComponent } from './startup-agency-demo/sta-banner/sta-banner.component';
import { StaFeaturedServicesComponent } from './startup-agency-demo/sta-featured-services/sta-featured-services.component';
import { StaCaseStudiesComponent } from './startup-agency-demo/sta-case-studies/sta-case-studies.component';
import { StaQuotesComponent } from './startup-agency-demo/sta-quotes/sta-quotes.component';
import { StaAboutComponent } from './startup-agency-demo/sta-about/sta-about.component';
import { StaTeamComponent } from './startup-agency-demo/sta-team/sta-team.component';
import { StaPricingComponent } from './startup-agency-demo/sta-pricing/sta-pricing.component';
import { StaContactComponent } from './startup-agency-demo/sta-contact/sta-contact.component';
import { FreelancerPortfolioDemoComponent } from './freelancer-portfolio-demo/freelancer-portfolio-demo.component';
import { FpBannerComponent } from './freelancer-portfolio-demo/fp-banner/fp-banner.component';
import { FpMyProjectsComponent } from './freelancer-portfolio-demo/fp-my-projects/fp-my-projects.component';
import { FpFeedbackComponent } from './freelancer-portfolio-demo/fp-feedback/fp-feedback.component';
import { FpCtaComponent } from './freelancer-portfolio-demo/fp-cta/fp-cta.component';
import { SoftwareStartupDemoComponent } from './software-startup-demo/software-startup-demo.component';
import { SsBannerComponent } from './software-startup-demo/ss-banner/ss-banner.component';
import { SsFeaturesComponent } from './software-startup-demo/ss-features/ss-features.component';
import { SsAppDownloadComponent } from './software-startup-demo/ss-app-download/ss-app-download.component';
import { SsFaqComponent } from './software-startup-demo/ss-faq/ss-faq.component';
import { SsPricingComponent } from './software-startup-demo/ss-pricing/ss-pricing.component';
import { SsFeedbackComponent } from './software-startup-demo/ss-feedback/ss-feedback.component';
import { SsFunfactsVideoComponent } from './software-startup-demo/ss-funfacts-video/ss-funfacts-video.component';
import { SsServicesComponent } from './software-startup-demo/ss-services/ss-services.component';
import { SsPartnerComponent } from './software-startup-demo/ss-partner/ss-partner.component';
import { SsScreenshotsComponent } from './software-startup-demo/ss-screenshots/ss-screenshots.component';
import { DigitalMarketingDemoComponent } from './digital-marketing-demo/digital-marketing-demo.component';
import { DmBannerComponent } from './digital-marketing-demo/dm-banner/dm-banner.component';
import { DmContactComponent } from './digital-marketing-demo/dm-contact/dm-contact.component';
import { DmWorkingProcessComponent } from './digital-marketing-demo/dm-working-process/dm-working-process.component';
import { DmAboutComponent } from './digital-marketing-demo/dm-about/dm-about.component';
import { DmServicesComponent } from './digital-marketing-demo/dm-services/dm-services.component';
import { DmFunfactsComponent } from './digital-marketing-demo/dm-funfacts/dm-funfacts.component';
import { DmCaseStudiesComponent } from './digital-marketing-demo/dm-case-studies/dm-case-studies.component';
import { DmTestimonialsComponent } from './digital-marketing-demo/dm-testimonials/dm-testimonials.component';
import { DmPricingComponent } from './digital-marketing-demo/dm-pricing/dm-pricing.component';
import { DmTeamComponent } from './digital-marketing-demo/dm-team/dm-team.component';
import { BusinessConsultingDemoComponent } from './business-consulting-demo/business-consulting-demo.component';
import { BcBannerComponent } from './business-consulting-demo/bc-banner/bc-banner.component';
import { BcFeaturesComponent } from './business-consulting-demo/bc-features/bc-features.component';
import { BcAboutComponent } from './business-consulting-demo/bc-about/bc-about.component';
import { BcServicesComponent } from './business-consulting-demo/bc-services/bc-services.component';
import { BcFunfactsComponent } from './business-consulting-demo/bc-funfacts/bc-funfacts.component';
import { BcWhatWeDoComponent } from './business-consulting-demo/bc-what-we-do/bc-what-we-do.component';
import { BcTeamComponent } from './business-consulting-demo/bc-team/bc-team.component';
import { BcPricingComponent } from './business-consulting-demo/bc-pricing/bc-pricing.component';
import { BcCtaComponent } from './business-consulting-demo/bc-cta/bc-cta.component';
import { BcBlogComponent } from './business-consulting-demo/bc-blog/bc-blog.component';
import { BcPartnerComponent } from './business-consulting-demo/bc-partner/bc-partner.component';
import { AppShowcaseDemoComponent } from './app-showcase-demo/app-showcase-demo.component';
import { AsBannerComponent } from './app-showcase-demo/as-banner/as-banner.component';
import { AsPartnerComponent } from './app-showcase-demo/as-partner/as-partner.component';
import { AsAboutComponent } from './app-showcase-demo/as-about/as-about.component';
import { AsFunfactsComponent } from './app-showcase-demo/as-funfacts/as-funfacts.component';
import { AsFeaturesComponent } from './app-showcase-demo/as-features/as-features.component';
import { AsScreenshotsComponent } from './app-showcase-demo/as-screenshots/as-screenshots.component';
import { AsAppDownloadComponent } from './app-showcase-demo/as-app-download/as-app-download.component';
import { AsFeedbackComponent } from './app-showcase-demo/as-feedback/as-feedback.component';
import { AsPricingComponent } from './app-showcase-demo/as-pricing/as-pricing.component';
import { AsFaqComponent } from './app-showcase-demo/as-faq/as-faq.component';
import { PersonalPortfolioDemoComponent } from './personal-portfolio-demo/personal-portfolio-demo.component';
import { PpBannerComponent } from './personal-portfolio-demo/pp-banner/pp-banner.component';
import { PpServicesComponent } from './personal-portfolio-demo/pp-services/pp-services.component';
import { PpProjectsComponent } from './personal-portfolio-demo/pp-projects/pp-projects.component';
import { PpSkillsComponent } from './personal-portfolio-demo/pp-skills/pp-skills.component';
import { PpExperienceComponent } from './personal-portfolio-demo/pp-experience/pp-experience.component';
import { PpTestimonialsComponent } from './personal-portfolio-demo/pp-testimonials/pp-testimonials.component';
import { PpClientsComponent } from './personal-portfolio-demo/pp-clients/pp-clients.component';
import { PpBlogComponent } from './personal-portfolio-demo/pp-blog/pp-blog.component';
import { PpContactComponent } from './personal-portfolio-demo/pp-contact/pp-contact.component';
import { SaasStartupDemoComponent } from './saas-startup-demo/saas-startup-demo.component';
import { SssBannerComponent } from './saas-startup-demo/sss-banner/sss-banner.component';
import { SssPartnerComponent } from './saas-startup-demo/sss-partner/sss-partner.component';
import { SssAboutComponent } from './saas-startup-demo/sss-about/sss-about.component';
import { SssServicesComponent } from './saas-startup-demo/sss-services/sss-services.component';
import { SssHowItWorksComponent } from './saas-startup-demo/sss-how-it-works/sss-how-it-works.component';
import { SssPricingComponent } from './saas-startup-demo/sss-pricing/sss-pricing.component';
import { SssFeedbackComponent } from './saas-startup-demo/sss-feedback/sss-feedback.component';
import { CyberSecurityAgencyDemoComponent } from './cyber-security-agency-demo/cyber-security-agency-demo.component';
import { CsaBannerComponent } from './cyber-security-agency-demo/csa-banner/csa-banner.component';
import { CsaFeaturesComponent } from './cyber-security-agency-demo/csa-features/csa-features.component';
import { CsaServicesComponent } from './cyber-security-agency-demo/csa-services/csa-services.component';
import { CsaAboutComponent } from './cyber-security-agency-demo/csa-about/csa-about.component';
import { CsaWhyChooseUsComponent } from './cyber-security-agency-demo/csa-why-choose-us/csa-why-choose-us.component';
import { CsaFunfactsComponent } from './cyber-security-agency-demo/csa-funfacts/csa-funfacts.component';
import { CsaPartnerComponent } from './cyber-security-agency-demo/csa-partner/csa-partner.component';
import { CsaTechnologyCompanyComponent } from './cyber-security-agency-demo/csa-technology-company/csa-technology-company.component';
import { CsaFeedbackComponent } from './cyber-security-agency-demo/csa-feedback/csa-feedback.component';
import { CsaCtaComponent } from './cyber-security-agency-demo/csa-cta/csa-cta.component';
import { CsaContactComponent } from './cyber-security-agency-demo/csa-contact/csa-contact.component';
import { ProjectsDetailsDemoComponent } from './projects-details-demo/projects-details-demo.component';
import { ServicesDetailsDemoComponent } from './services-details-demo/services-details-demo.component';
import { BlogDetailsDemoComponent } from './blog-details-demo/blog-details-demo.component';
import { PrivacyPolicyDemoComponent } from './privacy-policy-demo/privacy-policy-demo.component';
import { TermsConditionsDemoComponent } from './terms-conditions-demo/terms-conditions-demo.component';
import {DemoHomeComponent} from "./demo-home/demo-home.component";
import {CommonStartupModule} from "../../common/common-startup.module";
import {CommonModule} from "@angular/common";
import {PageComponentsModule} from "../pages-components/page-components.module";

@NgModule({
    declarations: [
        DigitalAgencyDemoComponent,
        DaBannerComponent,
        DaServicesComponent,
        DaAboutComponent,
        DaWorksComponent,
        DaFeedbackComponent,
        DaTeamComponent,
        DaFunfactsComponent,
        DaBlogComponent,
        DaContactComponent,
        CreativeAgencyDemoComponent,
        CaBlogComponent,
        CaTeamComponent,
        CaPricingComponent,
        CaFeedbackComponent,
        CaWorksComponent,
        CaServicesComponent,
        CaAboutComponent,
        CaBannerComponent,
        CaContactComponent,
        ItAgencyDemoComponent,
        IaBannerComponent,
        IaServicesComponent,
        IaFeaturesComponent,
        IaWhyChooseUsComponent,
        IaFeedbackComponent,
        IaTeamComponent,
        IaPricingComponent,
        IaBlogComponent,
        IaContactComponent,
        MarketingAgencyDemoComponent,
        MaBannerComponent,
        MaServicesComponent,
        MaProjectsComponent,
        MaFeedbackComponent,
        MaAboutComponent,
        MaFunfactsComponent,
        MaCtaComponent,
        MaBlogComponent,
        MaContactComponent,
        PortfolioAgencyDemoComponent,
        PaBannerComponent,
        PaProjectsComponent,
        PaFunfactsComponent,
        StudioAgencyDemoComponent,
        SaFeedbackComponent,
        SaContactComponent,
        SaBlogComponent,
        SaAboutComponent,
        SaProjectsComponent,
        SaBannerComponent,
        SaServicesComponent,
        BusinessAgencyDemoComponent,
        BaContactComponent,
        BaFeedbackComponent,
        BaTeamComponent,
        BaPricingComponent,
        BaWorksComponent,
        BaServicesComponent,
        BaBannerComponent,
        BaAboutComponent,
        StartupAgencyDemoComponent,
        StaBannerComponent,
        StaFeaturedServicesComponent,
        StaCaseStudiesComponent,
        StaQuotesComponent,
        StaAboutComponent,
        StaTeamComponent,
        StaPricingComponent,
        StaContactComponent,
        FreelancerPortfolioDemoComponent,
        FpBannerComponent,
        FpMyProjectsComponent,
        FpFeedbackComponent,
        FpCtaComponent,
        SoftwareStartupDemoComponent,
        SsBannerComponent,
        SsFeaturesComponent,
        SsAppDownloadComponent,
        SsFaqComponent,
        SsPricingComponent,
        SsFeedbackComponent,
        SsFunfactsVideoComponent,
        SsServicesComponent,
        SsPartnerComponent,
        SsScreenshotsComponent,
        DigitalMarketingDemoComponent,
        DmBannerComponent,
        DmContactComponent,
        DmWorkingProcessComponent,
        DmAboutComponent,
        DmServicesComponent,
        DmFunfactsComponent,
        DmCaseStudiesComponent,
        DmTestimonialsComponent,
        DmPricingComponent,
        DmTeamComponent,
        BusinessConsultingDemoComponent,
        BcBannerComponent,
        BcFeaturesComponent,
        BcAboutComponent,
        BcServicesComponent,
        BcFunfactsComponent,
        BcWhatWeDoComponent,
        BcTeamComponent,
        BcPricingComponent,
        BcCtaComponent,
        BcBlogComponent,
        BcPartnerComponent,
        AppShowcaseDemoComponent,
        AsBannerComponent,
        AsPartnerComponent,
        AsAboutComponent,
        AsFunfactsComponent,
        AsFeaturesComponent,
        AsScreenshotsComponent,
        AsAppDownloadComponent,
        AsFeedbackComponent,
        AsPricingComponent,
        AsFaqComponent,
        PersonalPortfolioDemoComponent,
        PpBannerComponent,
        PpServicesComponent,
        PpProjectsComponent,
        PpSkillsComponent,
        PpExperienceComponent,
        PpTestimonialsComponent,
        PpClientsComponent,
        PpBlogComponent,
        PpContactComponent,
        SaasStartupDemoComponent,
        SssBannerComponent,
        SssPartnerComponent,
        SssAboutComponent,
        SssServicesComponent,
        SssHowItWorksComponent,
        SssPricingComponent,
        SssFeedbackComponent,
        CyberSecurityAgencyDemoComponent,
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
        ProjectsDetailsDemoComponent,
        ServicesDetailsDemoComponent,
        BlogDetailsDemoComponent,
        PrivacyPolicyDemoComponent,
        TermsConditionsDemoComponent,
        DemoHomeComponent
    ],
    imports: [
        CommonModule,
        PagesDemoRoutingModule,
        CarouselModule,
        StickyNavModule,
        NgxSmartModalModule.forRoot(),
        NgxScrollTopModule,
        TabsModule.forRoot(),
        CommonStartupModule,
        AccordionModule,
        PageComponentsModule
    ],
    providers: [],
    bootstrap: []
})
export class PagesDemoModule { }
