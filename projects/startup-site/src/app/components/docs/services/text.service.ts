import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import * as marked from 'marked';

// import { NgdHighlightService } from './highlight.service';

export interface NgdMdSection {
  fragment: string;
  html: string;
  source: string;
  title: string;
}

@Injectable()
export class NgdTextService {

  private readonly SECTION_SPLIT = '<hr>';
  private readonly TITLE_MASK = '^#{1,6}[^#]?(.+)\n';
  private readonly STRIP_HTML = '<\\/?[^>]+(>|$)';

  constructor(
    // private highlight: NgdHighlightService,
    private location: Location) {
  }

  mdToSectionsHTML(markdown: string): NgdMdSection[] {
    return this.splitIntoSections(markdown)
      .map((section) => {
        const html = this.mdToHTML(section);
        const title = this.extractTitle(section) || this.extractFirstTwoWords(html);
        const fragment = this.createSlag(title);
        return {
          source: section,
          title: title,
          fragment: fragment,
          html: html,
        };
      });
  }

  mdToHTML(markdown: string) {
    return marked
      .setOptions({
        baseUrl: this.location.prepareExternalUrl(''),
        langPrefix: 'hljs ',
        // highlight: (code) => this.highlight.highlight(code),
      } as any)
      .parse(markdown.trim());
  }

  splitIntoSections(markdown: string) {
    return markdown.split(new RegExp(this.SECTION_SPLIT, 'g'))
      .filter(section => section.trim());
  }

  extractTitle(section: string) {
    const titleMatch = section.trim().match(new RegExp(this.TITLE_MASK, 'i'));
    return titleMatch ? titleMatch[1] : '';
  }

  extractFirstTwoWords(section: string) {
    return section
      .replace(new RegExp(this.STRIP_HTML, 'g'), '')
      .trim()
      .split(/\s+/g)
      .slice(0, 2)
      .join(' ');
  }

  createSlag(name: string) {
    return name
      .toString()                           // Cast to string (optional)
      .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
      .toLowerCase()                  // Convert the string to lowercase letters
      .trim()                                  // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '-')            // Replace spaces with -
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
      .replace(/\-\-+/g, '-');        // Replace multiple - with single -
  }
}
