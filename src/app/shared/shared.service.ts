import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Meta, Title} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';
import * as moment from 'moment';
import {NbThemeService} from '@nebular/theme';
import {IRouteParams} from '../models/route-params.model';
import {AccountService} from '../services/account.service';
import {MiddlewareCookieService} from '../services/middleware-cookie.service';
import {themes} from '../constants/themes.constants';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isBrowser = false;
  routeParamsSubject: BehaviorSubject<IRouteParams>;

  constructor(
    @Inject(PLATFORM_ID) platformId: string,
    public accountService: AccountService,
    private titleService: Title,
    private meta: Meta,
    private themeService: NbThemeService,
    private cookieService: MiddlewareCookieService,
  ) {
    this.routeParamsSubject = new BehaviorSubject<any>(null);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setPageData(title?: string): void {
    if (!title) {
      title = 'Putz films';
    } else {
      title = `PUTZ - ${title}`;
    }
    this.titleService.setTitle(title);

    this.meta.updateTag({
      name: 'keywords',
      content: ``
    });
  }

  setTheme(): void {
    const allThemes = themes;
    const currentTheme = this.cookieService.getCookie('theme');
    const themeMatched = allThemes.some((theme: any) => {
      return theme.id?.toLowerCase() === currentTheme?.toLowerCase();
    });
    if (themeMatched) {
      this.changeTheme(currentTheme);
    } else if (this.isBrowser) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // dark mode
        this.changeTheme('dark');
      } else {
        this.changeTheme('default');
      }
    }
  }

  setFontSize(fontSize: number): void {
    if (this.isBrowser) {
      const html: HTMLElement = document.getElementsByTagName('html')[0];
      html.style.fontSize = `${fontSize}px`;
      this.cookieService.putCookie(environment.FONT_SIZE_KEY, fontSize);
    }
  }

  getFontSize(): number | null {
    const fontSize = this.cookieService.getCookie(environment.FONT_SIZE_KEY)
    if(fontSize) {
      return Number(fontSize);
    }
    return null;
  }


  changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
    const date = new Date(moment().add(12, 'months').format('YYYY-MM-DD'));
    this.cookieService.putCookie('theme', themeName, date);
  }


}
