import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../../services/menu-site-item.model";
import {navigationEuVotoLula} from "./navigation-eu-voto-lula";
import {ActivatedRoute} from '@angular/router';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-eu-voto-lula',
  templateUrl: './eu-voto-lula.component.html',
  styleUrls: ['./eu-voto-lula.component.scss']
})
export class EuVotoLulaComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationEuVotoLula);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = false;
    menuService.isNavbarDNone = false;
  }


  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(params => {
    //     if (params?.renderId) {
    //       this.viewportScroller.scrollToAnchor('how-it-works');
    //     }
    //   }
    // );
  }

}
