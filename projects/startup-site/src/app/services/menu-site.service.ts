import {Injectable, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "./menu-site-item.model";
import {navigationExample} from "./navigation-example";

@Injectable()
export class MenuSiteService {
  currentMenu:BehaviorSubject<IMenuSiteItemModel[]>;
  isCentred:          boolean = false;
  showLogin:          boolean = false;
  isNavBarColorWhite: boolean = false;
  isNavbarDNone:      boolean = false;

  constructor() {
    this.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationExample);
  }
}
