import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../../services/menu-site-item.model";
import {navigationFranq} from "../navigation-franq";

@Component({
  selector: 'app-render-form-franq-detail',
  templateUrl: './render-form-franq-detail.component.html',
  styleUrls: ['./render-form-franq-detail.component.scss']
})
export class RenderFormFranqDetailComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationFranq);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = false;
    menuService.isNavbarDNone = false;
  }

  ngOnInit(): void {
  }

}
