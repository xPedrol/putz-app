/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

// import { NgdTabbedService } from './tabbed.service';
import { NgdMdSection, NgdTextService } from './text.service';
import { STRUCTURE } from './app.options';
import { NgdArticleService } from './article.service';
import {HttpClient} from "@angular/common/http";
import {FaqService} from "../../../../../../../src/app/services/faq.service";

type NgdToc = { title: string, fragment: string }[];

@Injectable()
export class NgdStructureService {

  protected prepared;

  constructor(private textService: NgdTextService,
              private http: HttpClient,
              private faqService: FaqService,
              // private tabbedService: NgdTabbedService,
              private articleService: NgdArticleService,
              @Inject(STRUCTURE) structure) {

    //Buscar structure do Banco
    // let mapa = this.getStructure()
    // console.warn(mapa);

    //Remover Itens ou Adicionar no Strucute Json que está pronto com Push and Pull
    this.prepared = this.prepareStructure(structure);
  }

  getStructure(): Observable<any[]> {
    const apiUrl = "https://api.putzfilmes.com/api/public/faqs";
    return this.http.get(`${apiUrl}/structure`, { responseType: 'text' }).pipe(
      map((article) => this.textService.mdToSectionsHTML(article)),
      shareReplay(1),
    );
  }

  getPreparedStructure(): any {
    return this.prepared;
  }

  findPageBySlag(structure: any, slag: string): any {
    for (const item of structure) {
      if (item.slag === slag) {
        return item;
      }
      if (item.type === 'section' && item.children) {
        const deep = this.findPageBySlag(item.children, slag);
        if (deep) {
          return deep;
        }
      }
    }
  }

  protected prepareStructure(structure: any, parentSlag?: string): any {
    return structure.map((item: any) => {
      const slag = item.name ? this.textService.createSlag(item.name) : null;

      if (item.block === 'markdown') {
        item.sections = this.articleService.getArticle(item.source);
      }else if (item.block === 'markdownApi') {
        item.sections = this.articleService.getArticleApi(item.source);
      }

      if (item.children) {
        item.children = this.prepareStructure(item.children, slag);
      }

      if (item.type === 'page') {
        item.toc = this.prepareToc(item);
        item.slag = parentSlag ? `${parentSlag}_${slag}` : slag;
      }

      return item;
    });
  }

  protected getComponents(item: any, preparedDocs) {
    return item.source
      .map(source => preparedDocs.classes.find((data) => data.name === source))
      .map(component => this.prepareComponent(component));
  }

  protected prepareComponent(component: any) {
    if (!component.isPrepared) {
      const textNodes = component.overview.filter(node => node.type === 'text');
      if (textNodes && textNodes.length) {
        textNodes[0].content = `## ${component.name}\n\n${textNodes[0].content}`; // TODO: this is bad
      }
      // Set isPrepared property to skip repeatin sources in structure.ts
      component.isPrepared = true;
    }
    return {
      ... component,
      slag: this.textService.createSlag(component.name),
      overview: component.overview.map((node: any) => {
        if (node.type === 'text') {
          return {
            type: node.type,
            content: this.textService.mdToSectionsHTML(node.content),
          };
        }
        return node;
      }),
    };
  }

  protected prepareToc(item: any): Observable<NgdToc[]> {
    // console.warn(item);
    const tocList: Observable<NgdToc>[] = item.children
      .reduce((acc: Observable<NgdToc>[], child: any) => {
        if (child.block === 'markdown') {
          acc.push(this.getTocForMd(child));
        }
        return acc;
      }, []);

    return combineLatest(tocList).pipe(
      map((toc) => [].concat(...toc)),
    );
  }

  protected getTocForMd(block: { sections: Observable<NgdMdSection[]> }): Observable<NgdToc> {
    return block.sections
      .pipe(
        map((sections) => {
          return sections
            .map(({ title, fragment }) => ({ title, fragment }));
        }),
      );
  }

  protected getTocForComponent(block: any): Observable<NgdToc> {
    return of([{
      title: block.source.name,
      fragment: block.source.slag,
    }]);
  }

  protected getTocForTabbed(block: any): Observable<NgdToc> {
    return of(block.children.map((component: any) => ({
      title: component.name,
      fragment: this.textService.createSlag(component.name),
    })));
  }
}
