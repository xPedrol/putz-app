import {Component, OnInit} from '@angular/core';
import {FaqService} from "../../../../../../../src/app/services/faq.service";
import {ActivatedRoute} from "@angular/router";
import {NgdTextService} from "../../../services/text.service";

@Component({
  selector: 'app-faq-question',
  templateUrl: './faq-question.component.html',
  styleUrls: ['./faq-question.component.scss']
})
export class FaqQuestionComponent implements OnInit {

  faq: string;
  loadingFaq = false;

  constructor(
    private faqService: FaqService,
    private service: NgdTextService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('faqType') && params.get('faqSlug')) {
        this.getFaq(params.get('faqType'), params.get('faqSlug'));
      }
    });
  }

  getFaq(faqType: string, faqSlug: string) {
    this.loadingFaq = true;
    this.faqService.getFaqByTypeAndSlug(faqType, faqSlug).subscribe((faq) => {
      this.faq = this.service.mdToHTML(faq);
    }).add(() => this.loadingFaq = false);
  }


}
