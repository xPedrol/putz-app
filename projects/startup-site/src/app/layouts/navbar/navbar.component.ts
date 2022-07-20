import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import {Router} from '@angular/router';
import {AccountService} from "../../../../../../src/app/services/account.service";
import {IAccount} from "../../../../../../src/app/models/account.model";
import {environment} from "../../../../../../src/environments/environment";
import {Subject} from "rxjs";
import {MiddlewareCookieService} from "../../../../../../src/app/services/middleware-cookie.service";
import {MenuSiteService} from "../../services/menu-site.service";
import {navigationExample} from "../../services/navigation-example";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() public navItens = navigationExample;
  @Input() public isCentred = false;
  @Input() public showLogin = true;

  isDropdownOpen: boolean = false;

  isAdmin = false;
  userPictureOnly: boolean = true;
  account: IAccount | null;
  // userMenu = userMenu;

  baseFontSize: number;
  mainUrl = environment.MAIN_APP_URL;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public menuService: MenuSiteService,
    public accountService: AccountService,
    public router: Router,
    private cookieService: MiddlewareCookieService,
    private changeDetectorRef: ChangeDetectorRef,
    private viewportScroller: ViewportScroller
  ) {
    this.account = null;
    // const fontSize = this.sharedService.getFontSize();
    // this.baseFontSize = fontSize ?? 16;
  }

  logout(navigate: boolean = true): void {
    this.cookieService.removeCookie('putz_auth_token');
    this.cookieService.removeCookie('access-permission');
    this.accountService.clearAccount();
    if (navigate) {
      this.router.navigateByUrl('/auth/login');
    }else{
      this.router.navigateByUrl('/');
    }

  }

  ngOnInit() {
    this.menuService.currentMenu.subscribe(menu => {
      if (menu && menu != this.navItens) {
        this.navItens = menu;
      }
    });
    // if(!this.appConfig.config.isMainApp) {
    //   this.userMenu.map((item: any) => {
    //     if (item.link) {
    //       item.url = `${this.mainUrl}${item.link}`;
    //       delete item.link;
    //     }
    //     return item;
    //   });
    // }
    this.accountService.accountSubject.subscribe(account => {
      if (account) {
        this.account = account;
        this.isAdmin = account.isAdmin;
      } else {
        this.isAdmin = false;
      }
      this.changeDetectorRef.markForCheck();
    });

    // this.menuService.onItemClick()
    //   .pipe(
    //     filter(({tag}) => tag === 'userMenu'),
    //     map(({item}) => item),
    //   )
    //   .subscribe((menu: any) => {
    //     if (menu.id === 1) {
    //       this.authService.logout();
    //     }
    //   });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // setFontSize(up?: boolean): void {
  //   if (this.baseFontSize) {
  //     if (typeof up === 'boolean') {
  //       if (up) {
  //         this.baseFontSize++;
  //       } else {
  //         this.baseFontSize--;
  //       }
  //     } else if (typeof up === 'undefined') {
  //       this.baseFontSize = 16;
  //     }
  //     this.sharedService.setFontSize(this.baseFontSize);
  //   }
  // }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

}
