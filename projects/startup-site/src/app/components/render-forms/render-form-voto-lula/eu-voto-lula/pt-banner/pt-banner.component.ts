import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ViewportScroller } from '@angular/common';
import { Router } from "@angular/router";

@Component({
    selector: 'app-pt-banner',
    templateUrl: './pt-banner.component.html',
    styleUrls: ['./pt-banner.component.scss']
})
export class PtBannerComponent implements OnInit {

    constructor(
        public router: Router,
        public ngxSmartModalService: NgxSmartModalService,
        private viewportScroller: ViewportScroller
    ) {

    }

    public onClick(elementId: string): void {
        this.viewportScroller.scrollToAnchor(elementId);
    }

    ngOnInit(): void {
    }

    homeSlides: OwlOptions = {
        items: 1,
        nav: false,
        loop: true,
        dots: true,
        autoplay: true,
        smartSpeed: 500,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        autoplayHoverPause: true,
        navText: [
          "<i class='fa-solid fa-chevron-left'></i>",
          "<i class='fa-solid fa-chevron-right'></i>"
        ]
    }

}
