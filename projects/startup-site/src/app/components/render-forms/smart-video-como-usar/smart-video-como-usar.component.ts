import { Component, OnInit } from '@angular/core';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-smart-video-como-usar',
  templateUrl: './smart-video-como-usar.component.html',
  styleUrls: ['./smart-video-como-usar.component.scss']
})
export class SmartVideoComoUsarComponent implements OnInit {

  constructor(
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
