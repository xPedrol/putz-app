import {Component, HostBinding, Inject, Input, OnInit} from '@angular/core';
import {NB_WINDOW, NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import {environment} from "../../../../environments/environment";
import {IAccount} from "../../../../../../../src/app/models/account.model";
import {AccountService} from "../../../../../../../src/app/services/account.service";
import {userMenu} from "../../../../../../../src/app/constants/user-menu.constants";
import {ApplicationConfigService} from "../../../../../../../src/app/services/application-config.service";
import {filter, map} from "rxjs/operators";
import {AuthService} from "../../../../../../../src/app/services/auth.service";

@Component({
  selector: 'app-hero-header',
  templateUrl: './hero-header.component.html',
  styleUrls: ['./hero-header.component.scss']
})
export class HeroHeaderComponent implements OnInit {

  mainMenu: NbMenuItem[] = [
    {
      title: 'Sobre a Putz',
      url: 'https://www.putzfilmes.com',
      target: '_blank'
    },
    {
      title: 'Docs',
      url: '/docs',
    },
    {
      title: 'Faq',
      url: '/faqs',
    },
  ];
  isLoadingAccount;
  account: IAccount;
  @Input() sidebarTag: string | undefined;
  @Input() showSearch = true;
  @HostBinding('class.docs-page') @Input() isDocs = false;
  private window: Window;
  userMenu: NbMenuItem[] = userMenu;
  mainUrl = environment.MAIN_APP_URL;

  constructor(
    @Inject(NB_WINDOW) window: any,
    private sidebarService: NbSidebarService,
    private accountService: AccountService,
    public appConfig: ApplicationConfigService,
    private menuService: NbMenuService,
    private authService: AuthService
  ) {
    this.window = window;
  }

  ngOnInit(): void {
    this.isLoadingAccount = true;
    this.accountService.getAccount().subscribe().add(() => this.isLoadingAccount = false);

    this.accountService.accountSubject.subscribe({
      next: account => {
        this.account = account;
        if (!account) {
          this.addNoAuthMenus();
        } else {
          this.removeNoAuthMenus();
        }
      },
      error: () => this.addNoAuthMenus()
    });

    if (!this.appConfig.config.isMainApp) {
      this.userMenu.map((item: any) => {
        if (item.link) {
          item.url = `${this.mainUrl}${item.link}`;
          delete item.link;
        }
        return item;
      });
    }
    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'userMenu'),
        map(({item}) => item),
      )
      .subscribe((menu: any) => {
        if (menu.id === 1) {
          this.authService.logout(false);
        }
      });
  }


  toggleSidebar() {
    // this.sidebarService.toggle(false, this.sidebarTag);
  }

  addNoAuthMenus() {
    if (!this.hasNoAuthMenus()) {
      this.mainMenu.splice(1, 0, {
          title: 'Login',
          url: `${this.mainUrl}/auth/login`,
          target: '_blank'
        },
        {
          title: 'Cadastro',
          url: `${this.mainUrl}/auth/register`,
          target: '_blank'
        });
    }
  }

  removeNoAuthMenus() {
    if (this.hasNoAuthMenus()) {
      this.mainMenu.splice(1, 2);
    }
  }

  hasNoAuthMenus(): boolean {
    return this.mainMenu.some(menuItem => {
      return menuItem.url.includes('/auth/');
    });
  }
}
