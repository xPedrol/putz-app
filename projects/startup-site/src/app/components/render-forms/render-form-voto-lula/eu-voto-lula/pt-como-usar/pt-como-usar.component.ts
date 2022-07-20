import { Component, OnInit } from '@angular/core';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-pt-como-usar',
  templateUrl: './pt-como-usar.component.html',
  styleUrls: ['./pt-como-usar.component.scss']
})
export class PtComoUsarComponent implements OnInit {

  constructor(
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
