import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../../../services/sidebar.service';
import {LayoutService} from '../../../core/utils/layout.service';
import {NbAccessChecker} from '@nebular/security';
import {MenuItemsService} from "../../../core/utils/menu-items.service";
import {environment} from "../../../../environments/environment";
import {ConfigurationService} from "../../../services/config/configuration.service";

@Component({
  selector: 'app-main-app-one-column-layout',
  templateUrl: './main-app-one-column-layout.component.html',
  styleUrls: ['./main-app-one-column-layout.component.scss'],
  providers: [
    SidebarService
  ]
})
export class MainAppOneColumnLayoutComponent implements OnInit {
  subheader = true;
  isProd = environment.production;
  managementInfo: any;

  constructor(
    public menuItemsService: MenuItemsService,
    public layoutService: LayoutService,
    private accessChecker: NbAccessChecker,
    public sidebarService: SidebarService,
    private configurationService: ConfigurationService
  ) {
  }

  ngOnInit(): void {
    this.accessChecker.isGranted('view', 'subheader').subscribe(hasAccess => {
      this.subheader = hasAccess;
      this.menuItemsService.getMainAppItems();
    });
    this.getManagementInfo();
  }

  getManagementInfo() {
    this.configurationService.getManagementInfo().subscribe(data => {
        this.managementInfo = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
