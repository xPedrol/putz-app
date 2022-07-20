import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../../../../../../src/app/services/sidebar.service';
import {MenuItemsService} from "../../../../../../src/app/core/utils/menu-items.service";
import {IAppMenu} from "../../../../../../src/app/models/app-menu.model";

@Component({
  selector: 'app-customer-pages-one-column-layout',
  templateUrl: './customer-pages-one-column-layout.component.html',
  styleUrls: ['./customer-pages-one-column-layout.component.scss']
})
export class CustomerPagesOneColumnLayoutComponent implements OnInit {

  constructor(
    public menuItemsService: MenuItemsService,
    public sidebarService: SidebarService,
    // private service: NgdMenuService,
    // private faqService: FaqService,
  ) {
    this.menuItemsService.getCustomerPagesItems();
  }

  ngOnInit(): void {
  }

  // getFaqStructure() {
  //   this.faqService.getFaqStructure().subscribe((faqStructure) => {
  //     console.warn('ola')
  //     // this.menuItemsService.setChildrenByName('faq-menu', this.service.getPreparedMenuFaq(faqStructure, '/faqs'));
  //   });
  // }
}
