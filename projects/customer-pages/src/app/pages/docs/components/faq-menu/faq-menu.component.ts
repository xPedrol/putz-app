import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgdMenuService} from '../../../../services/menu.service';
import {NbMediaBreakpoint, NbMenuItem, NbThemeService} from '@nebular/theme';
import {map, takeUntil, withLatestFrom} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-faq-menu',
  templateUrl: './faq-menu.component.html',
  styleUrls: ['./faq-menu.component.scss']
})
export class FaqMenuComponent implements OnInit,OnDestroy {
  menuItems: NbMenuItem[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private service: NgdMenuService,
    private router:Router,
    private themeService: NbThemeService,
  ) {
  }

  ngOnInit(): void {
    this.menuItems = this.service.getPreparedMenu('/docs');
    this.router.events
      .pipe(
        withLatestFrom(this.themeService.onMediaQueryChange().pipe(map((changes: any[]) => changes[1]))),
        takeUntil(this.destroy$),
      )
      .subscribe(([event, mediaQuery]: [any, NbMediaBreakpoint]) => {
        if (event.url === '/docs') {
          const firstMenuItem = this.menuItems[0].children[0];
          // angular bug with replaceUrl, temp fix with setTimeout
          setTimeout(() => this.router.navigateByUrl(firstMenuItem.link, { replaceUrl: true }));
        }
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
