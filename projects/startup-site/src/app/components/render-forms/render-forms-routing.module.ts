import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'galo-poc',
    loadChildren: () => import('./render-form-galo/render-form-galo.module').then(m => m.RenderFormGaloModule)
  },
  {
    path: 'galo',
    loadChildren: () => import('./render-form-galo/render-form-galo.module').then(m => m.RenderFormGaloModule)
  },
  {
    path: 'poc',
    loadChildren: () => import('./render-form-poc/render-form-poc.module').then(m => m.RenderFormPocModule)
  },
  {
    path: 'franq',
    loadChildren: () => import('./render-form-franq/render-form-franq.module').then(m => m.RenderFormFranqModule)
  },
  {
    path: 'wine',
    loadChildren: () => import('./render-form-wine/render-form-wine.module').then(m => m.RenderFormWineModule)
  },
  {
    path: 'creditas',
    loadChildren: () => import('./render-form-creditas/render-form-creditas.module').then(m => m.RenderFormCreditasModule)
  },
  {
    path: 'voto-lula',
    loadChildren: () => import('./render-form-voto-lula/render-form-voto-lula.module').then(m => m.RenderFormVotoLulaModule)
  },
  {
    path: 'lula',
    loadChildren: () => import('./render-form-voto-lula/render-form-voto-lula.module').then(m => m.RenderFormVotoLulaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenderFormsRoutingModule {
}
