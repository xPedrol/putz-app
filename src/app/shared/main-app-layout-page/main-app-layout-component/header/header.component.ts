import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbThemeService} from '@nebular/theme';
import {filter, map, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {AccountService} from '../../../../services/account.service';
import {IAccount} from '../../../../models/account.model';
import {themes} from '../../../../constants/themes.constants';
import {MiddlewareCookieService} from '../../../../services/middleware-cookie.service';
import {Authority} from '../../../../constants/authority.constants';
import {SharedService} from '../../../shared.service';
import {IRenderBot} from '../../../../models/render-bot.models';
import {BotService, queryType} from '../../../../services/bot.service';
import {userMenu} from '../../../../constants/user-menu.constants';
import {SidebarService} from '../../../../services/sidebar.service';
import {adminConfigMenu} from '../../../../constants/config-menu.constants';
import {ApplicationConfigService} from '../../../../services/application-config.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../../themes/nebular-overrides.scss'],
  providers: [
    BotService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = false;
  userPictureOnly: boolean = true;
  account: IAccount | null;
  themes = themes;
  currentTheme = 'default';
  userMenu = userMenu;
  accessPermissionMenu: NbMenuItem[] | any = [
    {id: 0, title: 'Cliente', authorities: [Authority.CLIENT]},
    {id: 1, title: 'Freelancer', authorities: [Authority.FREELANCER]},
    {id: 2, title: 'Administrador', authorities: [Authority.ADMIN]},
    {id: 3, title: 'Agência', authorities: [Authority.AGENCY]},
    {id: 4, title: 'Vendedor', authorities: [Authority.VENDOR]},
    {id: 4, title: 'Gerente', authorities: [Authority.MANAGER]}
  ];
  adminConfigMenu = adminConfigMenu;
  bots: IRenderBot[] | undefined;
  loadingBots = false;
  baseFontSize: number;
  mainUrl = environment.MAIN_APP_URL;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public sidebarService: SidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              public authService: AuthService,
              public accountService: AccountService,
              public router: Router,
              private sharedService: SharedService,
              private cookieService: MiddlewareCookieService,
              private botService: BotService,
              private changeDetectorRef: ChangeDetectorRef,
              public appConfig: ApplicationConfigService
  ) {
    this.account = null;
    const fontSize = this.sharedService.getFontSize();
    this.baseFontSize = fontSize ?? 16;
  }

  ngOnInit() {
    if(!this.appConfig.config.isMainApp) {
      this.userMenu.map((item: any) => {
        if (item.link) {
          item.url = `${this.mainUrl}${item.link}`;
          delete item.link;
        }
        return item;
      });
    }
    this.accountService.accountSubject.subscribe(account => {
      if (account) {
        this.account = account;
        this.isAdmin = account.isAdmin;
      } else {
        this.isAdmin = false;
      }
      this.changeDetectorRef.markForCheck();
    });
    this.currentTheme = this.themeService.currentTheme;

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'userMenu'),
        map(({item}) => item),
      )
      .subscribe((menu: any) => {
        if (menu.id === 1) {
          this.authService.logout();
        }
      });
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'themeMenu'),
        // @ts-ignore
        map(({item: {id}}) => id),
      )
      .subscribe((theme) => {
        this.sharedService.changeTheme(theme);
      });
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'accessPermissionMenu'),
        map(({item}) => item),
      )
      .subscribe((menu: any) => {
        this.cookieService.putCookie('access-permission', menu.authorities);
        location.reload();
        // this.accountService.accountSubject.next(this.accountService.accountSubject.getValue());
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(): void {
    this.sharedService.changeTheme(this.currentTheme === 'default' ? 'dark' : 'default');
  }

  getBots(): Observable<queryType> {
    this.loadingBots = true;
    return this.botService.query(null, false);
  }

  handleBots(observable: Observable<queryType>): void {
    observable.subscribe(res => {
      if (res && res?.bots)
        this.bots = res.bots;
    }).add(() => this.loadingBots = false);
  }

  canHandleBots(): void {
    if (this.isAdmin) {
      this.handleBots(this.getBots());
    }
  }

  setFontSize(up?: boolean): void {
    if (this.baseFontSize) {
      if (typeof up === 'boolean') {
        if (up) {
          this.baseFontSize++;
        } else {
          this.baseFontSize--;
        }
      } else if (typeof up === 'undefined') {
        this.baseFontSize = 16;
      }
      this.sharedService.setFontSize(this.baseFontSize);
    }
  }


}
