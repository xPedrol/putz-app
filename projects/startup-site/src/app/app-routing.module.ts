import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './common/not-found/not-found.component';
import {PutzSmartVideoComponent} from './components/pages/putz-smart-video/putz-smart-video.component';

const routes: Routes = [
  {
    path: '',
    component: PutzSmartVideoComponent
  },
  {
    path: 'servicos',
    loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'demos',
    loadChildren: () => import('./components/pages-demo/pages-demo.module').then(m => m.PagesDemoModule)
  },
  // {
  //   path: 'docs',
  //   loadChildren: () => import('./components/docs/documentation.module').then(m => m.NgdDocumentationModule)
  // },
  {
    path: 'videos',
    loadChildren: () => import('./components/render-forms/render-forms.module').then(m => m.RenderFormsModule)
  },
  // Here add new pages component
  {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
