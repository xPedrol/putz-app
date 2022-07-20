import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-route-tab',
  templateUrl: './custom-route-tab.component.html',
  styleUrls: ['./custom-route-tab.component.scss']
})
export class CustomRouteTabComponent implements OnInit {
  @Input() responsive:boolean = false;
  @Input() route: any | undefined;
  @Input() queryParams:any;
  @Input() icon:string | undefined;
  @Input() title:string | undefined;
  @Input() disabled:boolean = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  selectTab(tab:any): void {

  }
}
