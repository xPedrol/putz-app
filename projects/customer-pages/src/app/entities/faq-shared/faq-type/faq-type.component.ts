import {Component, OnInit} from '@angular/core';
import {FaqService} from "../../../../../../../src/app/services/faq.service";
import {IFaq} from "../../../../../../../src/app/models/faq.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-faq-type',
  templateUrl: './faq-type.component.html',
  styleUrls: ['./faq-type.component.scss']
})
export class FaqTypeComponent implements OnInit {
  faqQuestions: IFaq[];
  loadingFaq = false;

  constructor(
    private faqService: FaqService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('faqType')) {
        this.getFaqs(params.get('faqType'));
      }
    });
  }

  getFaqs(type: string) {
    this.loadingFaq = true;
    this.faqService.getFaqsByType(type).subscribe((faqs) => {
      this.faqQuestions = faqs;
    }).add(() => this.loadingFaq = false);
  }

  trackByFaqId(index: number, faq: IFaq) {
    return faq.id;
  }
}
