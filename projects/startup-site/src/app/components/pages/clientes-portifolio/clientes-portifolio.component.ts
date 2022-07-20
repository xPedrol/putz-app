import {Component, Input, OnInit} from '@angular/core';
import {MenuSiteService} from "../../../services/menu-site.service";
import {BehaviorSubject} from "rxjs";
import {IMenuSiteItemModel} from "../../../services/menu-site-item.model";
import {navigationExample} from "../../../services/navigation-example";
import {listClientesPages} from "./list-cliantes-pages";
import {navigationClientes} from "./navigationClientes";

@Component({
  selector: 'app-clientes-portifolio',
  templateUrl: './clientes-portifolio.component.html',
  styleUrls: ['./clientes-portifolio.component.scss']
})
export class ClientesPortifolioComponent implements OnInit {

  @Input() public slides = listClientesPages;

  constructor(
    private menuService: MenuSiteService,
  ) {
    menuService.currentMenu = new BehaviorSubject<IMenuSiteItemModel[]>(navigationClientes);
    menuService.showLogin = true;
    menuService.isCentred = false;
    menuService.isNavBarColorWhite = false;
    menuService.isNavbarDNone = false;
  }

  ngOnInit(): void {
  }

}
