import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FaqQuestionComponent} from "../../entities/faq-shared/faq-question/faq-question.component";
import {FaqTypeComponent} from "../../entities/faq-shared/faq-type/faq-type.component";
import {FaqWrapperComponent} from "../../entities/faq-shared/faq-wrapper/faq-wrapper.component";

const routes: Routes = [
  {
    path: '',
    component: FaqWrapperComponent,
    children: [
      {
        path: '',
        component: FaqTypeComponent,
      },
      {
        path: ':faqType',
        component: FaqTypeComponent,
      },
      {
        path: ':faqType/:faqSlug',
        component: FaqQuestionComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule {
}
