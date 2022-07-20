import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";
import {navigationExample} from "../../../services/navigation-example";

@Component({
  selector: 'app-cyber-security-agency-demo',
  templateUrl: './cyber-security-agency-demo.component.html',
  styleUrls: ['./cyber-security-agency-demo.component.scss']
})
export class CyberSecurityAgencyDemoComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationExample);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = true;
    menuService.isNavbarDNone = true;
  }

  ngOnInit(): void {
  }

}
