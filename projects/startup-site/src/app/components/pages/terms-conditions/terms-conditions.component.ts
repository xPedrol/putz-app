import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";
import {navigationExample} from "../../../services/navigation-example";

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationExample);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = false;
    menuService.isNavbarDNone = false;
  }

  ngOnInit(): void {
  }

}