import {Component, OnInit} from '@angular/core';
import {IAppMenu} from "../../../../../../../../src/app/models/app-menu.model";

@Component({
  selector: 'app-costumer-pages-sub-header',
  templateUrl: './costumer-pages-sub-header.component.html',
  styleUrls: ['./costumer-pages-sub-header.component.scss']
})
export class CostumerPagesSubHeaderComponent implements OnInit {
  headerItems: IAppMenu[];
  isBrowser: boolean;
  canShowGuidedTour = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  trackBySubHeaderItems(index: number, item: any) {
    return item.name;
  }
}
