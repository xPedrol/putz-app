import {Component, Input, OnInit} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import {MenuSiteService} from "../../services/menu-site.service";
import {navigationExample} from "../../services/navigation-example";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input() public navItens = navigationExample;

    constructor(
        public router: Router,
        public menuService: MenuSiteService,
        private viewportScroller: ViewportScroller
    ) { }

    ngOnInit(): void {
      this.menuService.currentMenu.subscribe(menu => {
        if (menu && menu != this.navItens) {
          this.navItens = menu;
        }
      });
    }

    public onClick(elementId: string): void {
        this.viewportScroller.scrollToAnchor(elementId);
    }

}
