import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-ma-casos-privalia',
    templateUrl: './ma-casos-privalia.component.html',
    styleUrls: ['./ma-casos-privalia.component.scss']
})
export class MaCasosPrivaliaComponent implements OnInit {

    constructor(
        public ngxSmartModalService: NgxSmartModalService
    ) { }

    ngOnInit(): void {}

}
