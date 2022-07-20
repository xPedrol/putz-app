import {Component, Input, OnInit} from '@angular/core';
import {listDemoPages} from './list-demo-pages'
import {MenuSiteService} from "../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";
import {navigationExample} from "../../../services/navigation-example";
@Component({
  selector: 'app-demo-home',
  templateUrl: './demo-home.component.html',
  styleUrls: ['./demo-home.component.scss']
})
export class DemoHomeComponent implements OnInit {

  @Input() public slides = listDemoPages;

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
