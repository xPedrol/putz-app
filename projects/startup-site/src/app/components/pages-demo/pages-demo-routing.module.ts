import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../common/not-found/not-found.component';
import { AppShowcaseDemoComponent } from './app-showcase-demo/app-showcase-demo.component';
import { BlogDetailsDemoComponent } from './blog-details-demo/blog-details-demo.component';
import { BusinessAgencyDemoComponent } from './business-agency-demo/business-agency-demo.component';
import { BusinessConsultingDemoComponent } from './business-consulting-demo/business-consulting-demo.component';
import { CreativeAgencyDemoComponent } from './creative-agency-demo/creative-agency-demo.component';
import { CyberSecurityAgencyDemoComponent } from './cyber-security-agency-demo/cyber-security-agency-demo.component';
import { DigitalAgencyDemoComponent } from './digital-agency-demo/digital-agency-demo.component';
import { DigitalMarketingDemoComponent } from './digital-marketing-demo/digital-marketing-demo.component';
import { FreelancerPortfolioDemoComponent } from './freelancer-portfolio-demo/freelancer-portfolio-demo.component';
import { ItAgencyDemoComponent } from './it-agency-demo/it-agency-demo.component';
import { MarketingAgencyDemoComponent } from './marketing-agency-demo/marketing-agency-demo.component';
import { PersonalPortfolioDemoComponent } from './personal-portfolio-demo/personal-portfolio-demo.component';
import { PortfolioAgencyDemoComponent } from './portfolio-agency-demo/portfolio-agency-demo.component';
import { PrivacyPolicyDemoComponent } from './privacy-policy-demo/privacy-policy-demo.component';
import { ProjectsDetailsDemoComponent } from './projects-details-demo/projects-details-demo.component';
import { SaasStartupDemoComponent } from './saas-startup-demo/saas-startup-demo.component';
import { ServicesDetailsDemoComponent } from './services-details-demo/services-details-demo.component';
import { SoftwareStartupDemoComponent } from './software-startup-demo/software-startup-demo.component';
import { StartupAgencyDemoComponent } from './startup-agency-demo/startup-agency-demo.component';
import { StudioAgencyDemoComponent } from './studio-agency-demo/studio-agency-demo.component';
import { TermsConditionsDemoComponent } from './terms-conditions-demo/terms-conditions-demo.component';
import { DemoHomeComponent } from "./demo-home/demo-home.component";

const routes: Routes = [
    {path: '', component: DemoHomeComponent},
    {path: 'digital-agency', component: DigitalAgencyDemoComponent},
    {path: 'creative-agency', component: CreativeAgencyDemoComponent},
    {path: 'it-agency', component: ItAgencyDemoComponent},
    {path: 'marketing-agency', component: MarketingAgencyDemoComponent},
    {path: 'portfolio-agency', component: PortfolioAgencyDemoComponent},
    {path: 'studio-agency', component: StudioAgencyDemoComponent},
    {path: 'business-agency', component: BusinessAgencyDemoComponent},
    {path: 'startup-agency', component: StartupAgencyDemoComponent},
    {path: 'freelancer-portfolio', component: FreelancerPortfolioDemoComponent},
    {path: 'software-startup', component: SoftwareStartupDemoComponent},
    {path: 'digital-marketing', component: DigitalMarketingDemoComponent},
    {path: 'business-consulting', component: BusinessConsultingDemoComponent},
    {path: 'app-showcase', component: AppShowcaseDemoComponent},
    {path: 'personal-portfolio', component: PersonalPortfolioDemoComponent},
    {path: 'saas-startup', component: SaasStartupDemoComponent},
    {path: 'cyber-security-agency', component: CyberSecurityAgencyDemoComponent},
    {path: 'privacy-policy-demo', component: PrivacyPolicyDemoComponent},
    {path: 'terms-conditions-demo', component: TermsConditionsDemoComponent},
    {path: 'services-details-demo', component: ServicesDetailsDemoComponent},
    {path: 'projects-details-demo', component: ProjectsDetailsDemoComponent},
    {path: 'blog-details', component: BlogDetailsDemoComponent},
    // Here add new pages component
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesDemoRoutingModule { }
