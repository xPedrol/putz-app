import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";
import {navigationProdutoraEleicoes} from "./navigationProdutoraEleicoes";

@Component({
  selector: 'app-putz-produtora-eleicoes',
  templateUrl: './putz-produtora-eleicoes.component.html',
  styleUrls: ['./putz-produtora-eleicoes.component.scss']
})
export class PutzProdutoraEleicoesComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationProdutoraEleicoes);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = true;
    menuService.isNavbarDNone = true;
  }

  ngOnInit(): void {
  }

}
