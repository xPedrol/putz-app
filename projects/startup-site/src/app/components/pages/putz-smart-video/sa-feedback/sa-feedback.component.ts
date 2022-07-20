import {Component, Input, OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {feedbackPosts} from "./feedback-posts";

@Component({
    selector: 'app-sa-feedback',
    templateUrl: './sa-feedback.component.html',
    styleUrls: ['./sa-feedback.component.scss']
})
export class SaFeedbackComponent implements OnInit {

    @Input() public feedbacks = feedbackPosts;
    @Input() public title = "";
    @Input() public subtitle = "";
    @Input() public showRating = false;
    @Input() public showBar = false;
    @Input() public showQuotesIcon = true;

    constructor() { }

    ngOnInit(): void {}

    feedbackSlides: OwlOptions = {
        items: 1,
		nav: false,
		loop: true,
		margin: 30,
		dots: true,
		autoplay: true,
		smartSpeed: 500,
		autoplayHoverPause: true,
		navText: [
			"<i class='fa-solid fa-chevron-left'></i>",
			"<i class='fa-solid fa-chevron-right'></i>"
		]
    }

}
