import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '../../common/not-found/not-found.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsConditionsComponent} from './terms-conditions/terms-conditions.component';
import {PutzSmartVideoComponent} from './putz-smart-video/putz-smart-video.component';
import {PutzPlataformComponent} from './putz-plataform/putz-plataform.component';
import {PutzProdutoraDiferenciaisComponent} from './putz-produtora-diferenciais/putz-produtora-diferenciais.component';
import {PutzSmartVideoLgpdComponent} from './putz-smart-video-lgpd/putz-smart-video-lgpd.component';
import {PutzStartupComponent} from './putz-startup/putz-startup.component';
import {ClientesPortifolioComponent} from './clientes-portifolio/clientes-portifolio.component';
import {PutzEpaComponent} from './putz-epa/putz-epa.component';
import {PutzProdutoraTecnologiaComponent} from './putz-produtora-tecnologia/putz-produtora-tecnologia.component';
import {PutzProdutoraVarejoComponent} from './putz-produtora-varejo/putz-produtora-varejo.component';
import {PutzProdutoraEleicoesComponent} from './putz-produtora-eleicoes/putz-produtora-eleicoes.component';

const routes: Routes = [
  {path: '', component: PutzSmartVideoComponent},
  {path: 'smart-videos', component: PutzSmartVideoComponent},
  {path: 'startup', component: PutzStartupComponent},
  {path: 'smart-videos-lgpd', component: PutzSmartVideoLgpdComponent},
  {path: 'epa', component: PutzEpaComponent},
  {path: 'plataforma', component: PutzPlataformComponent},
  {path: 'produtora', component: PutzProdutoraDiferenciaisComponent},
  {path: 'clientes', component: ClientesPortifolioComponent},
  {path: 'solucoes/varejo', component: PutzProdutoraVarejoComponent},
  {path: 'solucoes/tecnologia', component: PutzProdutoraTecnologiaComponent},
  {path: 'solucoes/fintech', component: PutzProdutoraTecnologiaComponent},
  {path: 'solucoes/servicos', component: PutzProdutoraVarejoComponent},
  {path: 'solucoes/industria', component: PutzProdutoraVarejoComponent},
  {path: 'solucoes/marcas', component: PutzProdutoraTecnologiaComponent},
  {path: 'solucoes/eleicoes', component: PutzProdutoraEleicoesComponent},

  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'politica-de-privacidade', component: PrivacyPolicyComponent},
  {path: 'terms-conditions', component: TermsConditionsComponent},
  {path: 'termos-e-condicoes', component: TermsConditionsComponent},
  {
    path: 'feedback',
    loadChildren: () => import('./render-form-feedback-detail/render-form-feedback-detail.module').then(m => m.RenderFormFeedbackDetailModule)
  },
  // Here add new pages component

  {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
