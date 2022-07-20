import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NbMenuItem, NbMenuService, NbThemeService} from '@nebular/theme';
import {AccountService} from '../../../../services/account.service';
import {IAccount} from '../../../../models/account.model';
import {themes} from '../../../../constants/themes.constants';
import {userMenu} from '../../../../constants/user-menu.constants';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {adminConfigMenu} from '../../../../constants/config-menu.constants';
import {SharedService} from '../../../shared.service';
import {SidebarService} from '../../../../services/sidebar.service';
import {MenuItemsService} from "../../../../core/utils/menu-items.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', '../../../themes/common.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarItems: NbMenuItem[];
  account: IAccount | undefined;
  themes = themes;
  userMenu = userMenu;
  isAdmin: boolean | undefined = false;
  adminConfigMenu = adminConfigMenu;
  currentTheme = 'default';
  private subject$: Subject<any> = new Subject<any>();

  constructor(
    private accountService: AccountService,
    private menuService: NbMenuService,
    private sidebarService: SidebarService,
    private sharedService: SharedService,
    private themeService: NbThemeService,
    private changeDetectorRef: ChangeDetectorRef,
    private menuItemsService: MenuItemsService,
  ) {
  }

  ngOnInit(): void {
    this.menuItemsService.currentMenu$.pipe(takeUntil(this.subject$)).subscribe(items => {
      if (items) {
        this.sidebarItems = items as NbMenuItem[];
      }
      this.changeDetectorRef.detectChanges();
    });
    this.currentTheme = this.themeService.currentTheme;
    this.accountService.accountSubject.pipe(takeUntil(this.subject$)).subscribe(account => {
      this.account = account ?? undefined;
      if (account) {
        this.isAdmin = account.isAdmin;
      } else {
        this.isAdmin = false;
      }
      this.changeDetectorRef.detectChanges();
    });

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.subject$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
      });

    this.menuService.onItemSelect()
      .pipe(takeUntil(this.subject$))
      .subscribe((value) => {
        if (!value.item.children) {
          this.collapse();
        }
      });
  }

  collapse(): void {
    this.sidebarService.collapseSidebar('menu-sidebar');
  }

  toggleTheme(): void {
    this.sharedService.changeTheme(this.currentTheme === 'default' ? 'dark' : 'default');
  }

  ngOnDestroy() {
    this.subject$.next(null);
    this.subject$.complete();
  }


}
