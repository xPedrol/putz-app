import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-components-promo',
  templateUrl: './components-promo.component.html',
  styleUrls: ['./components-promo.component.scss']
})
export class ComponentsPromoComponent implements OnInit {
  @Input() title = 'Angular UI components';
  @Input() description = `Choose from 40+ ready-to-use Angular UI components with no 3rd party dependencies.
                  Benefit from an easier and faster way of building a visually appealing and responsive UI for apps.`;
  constructor() { }

  ngOnInit(): void {
  }

}
