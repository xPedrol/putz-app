import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../../services/menu-site-item.model";
import {navigationGalo} from "../navigation-galo";

@Component({
  selector: 'app-render-form-galo-detail',
  templateUrl: './render-form-galo-detail.component.html',
  styleUrls: ['./render-form-galo-detail.component.scss']
})
export class RenderFormGaloDetailComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationGalo);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = false;
    menuService.isNavbarDNone = false;
  }

  ngOnInit(): void {
  }

}
