import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";
import {navigationExample} from "../../../services/navigation-example";
import {navigationProdutora} from "./navigationProdutora";

@Component({
  selector: 'app-putz-produtora-diferenciais',
  templateUrl: './putz-produtora-diferenciais.component.html',
  styleUrls: ['./putz-produtora-diferenciais.component.scss']
})
export class PutzProdutoraDiferenciaisComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationProdutora);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = false;
    menuService.isNavbarDNone = false;
  }

  ngOnInit(): void {
  }

}
