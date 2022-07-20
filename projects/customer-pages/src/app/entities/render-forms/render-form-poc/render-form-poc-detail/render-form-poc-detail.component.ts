import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-render-form-poc-detail',
  templateUrl: './render-form-poc-detail.component.html',
  styleUrls: ['./render-form-poc-detail.component.scss']
})
export class RenderFormPocDetailComponent implements OnInit {
  isFeedback = false;
  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }
}
