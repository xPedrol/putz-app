import { Component, OnInit } from '@angular/core';
import {MenuSiteService} from "../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";
import {navigationProdutoraTecnologia} from "./navigationProdutoraTecnologia";

@Component({
  selector: 'app-putz-produtora-tecnologia',
  templateUrl: './putz-produtora-tecnologia.component.html',
  styleUrls: ['./putz-produtora-tecnologia.component.scss']
})
export class PutzProdutoraTecnologiaComponent implements OnInit {

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationProdutoraTecnologia);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = true;
    menuService.isNavbarDNone = true;
  }

  ngOnInit(): void {
  }

}
