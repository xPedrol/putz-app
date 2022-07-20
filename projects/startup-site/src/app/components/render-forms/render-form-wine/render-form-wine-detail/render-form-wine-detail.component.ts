import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../../services/menu-site-item.model";
import {navigationWine} from "../navigation-wine";

@Component({
  selector: 'app-render-form-wine-detail',
  templateUrl: './render-form-wine-detail.component.html',
  styleUrls: ['./render-form-wine-detail.component.scss']
})
export class RenderFormWineDetailComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationWine);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = false;
    menuService.isNavbarDNone = false;
  }

  ngOnInit(): void {
  }

}
