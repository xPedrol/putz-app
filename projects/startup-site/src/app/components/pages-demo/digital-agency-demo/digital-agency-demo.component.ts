import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../services/menu-site.service";
import {navigationExample} from "../../../services/navigation-example";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";

@Component({
  selector: 'app-digital-agency-demo',
  templateUrl: './digital-agency-demo.component.html',
  styleUrls: ['./digital-agency-demo.component.scss']
})
export class DigitalAgencyDemoComponent implements OnInit {

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
