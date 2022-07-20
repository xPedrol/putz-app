import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NgdMdSection, NgdTextService } from './text.service';
import {FaqService} from "../../../../../src/app/services/faq.service";

@Injectable()
export class NgdArticleService {
  constructor(private http: HttpClient,
              private faqService: FaqService,
              private textService: NgdTextService) {}

  getArticle(source: string): Observable<NgdMdSection[]> {
    return this.http.get(`articles/${source}`, { responseType: 'text' }).pipe(
      map((article) => this.textService.mdToSectionsHTML(article)),
      shareReplay(1),
    );
  }

  getArticleApi(source: string): Observable<NgdMdSection[]> {
    return this.http.get(`articles/${source}`, { responseType: 'text' }).pipe(
      map((article) => this.textService.mdToSectionsHTML(article)),
      shareReplay(1),
    );
  }

}
