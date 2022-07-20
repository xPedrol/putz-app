import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
    selector: 'app-ma-casos-americanas',
    templateUrl: './ma-casos-americanas.component.html',
    styleUrls: ['./ma-casos-americanas.component.scss']
})
export class MaCasosAmericanasComponent implements OnInit {

    constructor(
        public ngxSmartModalService: NgxSmartModalService
    ) { }

    ngOnInit(): void {}

}
