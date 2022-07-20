import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-ma-casos-petz',
    templateUrl: './ma-casos-petz.component.html',
    styleUrls: ['./ma-casos-petz.component.scss']
})
export class MaCasosPetzComponent implements OnInit {

    constructor(
        public ngxSmartModalService: NgxSmartModalService
    ) { }

    ngOnInit(): void {}

}
