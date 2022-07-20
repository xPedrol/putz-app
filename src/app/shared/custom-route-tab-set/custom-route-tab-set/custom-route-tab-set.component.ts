import {Component, ViewEncapsulation} from '@angular/core';
import {NbRouteTabsetComponent} from '@nebular/theme';

@Component({
  selector: 'app-custom-route-tabset',
  templateUrl: './custom-route-tab-set.component.html',
  styleUrls: [
    './custom-route-tab-set.component.scss'
  ]
})
export class CustomRouteTabSetComponent extends NbRouteTabsetComponent{

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
