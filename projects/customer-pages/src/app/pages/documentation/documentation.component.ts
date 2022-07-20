/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import {NgdPaginationService} from './services/pagination.service';
import {NgdMenuService} from './../../services/menu.service';

@Component({
  selector: 'ngd-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class NgdDocumentationComponent {

  constructor(
    private service: NgdMenuService,
    private router: Router,
    private themeService: NbThemeService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private paginationService: NgdPaginationService
  ) {
    this.paginationService.setPaginationItems('/docs');
  }
}
