import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() url: string | undefined;
  @Input() last?: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
