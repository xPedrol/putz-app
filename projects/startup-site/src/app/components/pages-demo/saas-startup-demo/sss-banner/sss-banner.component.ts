import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-sss-banner',
    templateUrl: './sss-banner.component.html',
    styleUrls: ['./sss-banner.component.scss']
})
export class SssBannerComponent implements OnInit {

    constructor(
        private viewportScroller: ViewportScroller
    ) { }

    public onClick(elementId: string): void { 
        this.viewportScroller.scrollToAnchor(elementId);
    }

    ngOnInit(): void {}

}