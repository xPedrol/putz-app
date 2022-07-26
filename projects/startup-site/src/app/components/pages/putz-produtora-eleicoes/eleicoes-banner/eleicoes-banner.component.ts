import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-eleicoes-banner',
    templateUrl: './eleicoes-banner.component.html',
    styleUrls: ['./eleicoes-banner.component.scss']
})
export class EleicoesBannerComponent implements OnInit {

    constructor(
        private viewportScroller: ViewportScroller
    ) { }

    public onClick(elementId: string): void {
        this.viewportScroller.scrollToAnchor(elementId);
    }

    ngOnInit(): void {}

}
