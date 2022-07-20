import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";
import {navigationVarejo} from "./navigationVarejo";

@Component({
  selector: 'app-putz-produtora-varejo',
  templateUrl: './putz-produtora-varejo.component.html',
  styleUrls: ['./putz-produtora-varejo.component.scss']
})
export class PutzProdutoraVarejoComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationVarejo);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = false;
    menuService.isNavbarDNone = false;
  }

  ngOnInit(): void {
  }

}
