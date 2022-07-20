import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgdMenuService} from '../../../services/menu.service';
import {NbMediaBreakpoint, NbMenuItem, NbThemeService} from '@nebular/theme';
import {map, takeUntil, withLatestFrom} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {FaqService} from "../../../../../../../src/app/services/faq.service";

@Component({
  selector: 'app-faq-shared-menu',
  templateUrl: './faq-menu.component.html',
  styleUrls: ['./faq-menu.component.scss']
})
export class FaqMenuComponent implements OnInit, OnDestroy {
  menuItems: NbMenuItem[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private faqService: FaqService,
    private service: NgdMenuService,
    private router: Router,
    private themeService: NbThemeService,
  ) {
  }

  ngOnInit(): void {
    this.getFaqStructure()
    this.router.events
      .pipe(
        withLatestFrom(this.themeService.onMediaQueryChange().pipe(map((changes: any[]) => changes[1]))),
        takeUntil(this.destroy$),
      )
      .subscribe(([event, mediaQuery]: [any, NbMediaBreakpoint]) => {
        if (event.url === '/faqs') {
          const firstMenuItem = this.menuItems[0].children[0];
          // angular bug with replaceUrl, temp fix with setTimeout
          setTimeout(() => this.router.navigateByUrl(firstMenuItem.link, {replaceUrl: true}));
        }
      });
  }

  getFaqStructure() {
    this.faqService.getFaqStructure().subscribe((faqStructure) => {
      this.menuItems = this.service.getPreparedMenuFaq(faqStructure,'/faqs');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
