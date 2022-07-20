import {Component, Input, OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {feedbackPosts} from "./feedback-posts";

@Component({
    selector: 'app-feedback-posts',
    templateUrl: './feedback-posts.component.html',
    styleUrls: ['./feedback-posts.component.scss']
})
export class FeedbackPostsComponent implements OnInit {

    @Input() public feedbacks = feedbackPosts;
    @Input() public cssStyle = "light"; //light, dark
    @Input() public title = "sss";
    @Input() public subtitle = "ss";
    @Input() public showRating = true;
    @Input() public showBar = true;
    @Input() public showQuotesIcon = true;

    constructor() { }

    ngOnInit(): void {}

    feedbackSlides: OwlOptions = {
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
        ],
        items: 1,
    }

}
