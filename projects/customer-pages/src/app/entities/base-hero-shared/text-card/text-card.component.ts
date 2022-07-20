import {Component, Input, OnInit} from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-text-card',
  templateUrl: './text-card.component.html',
  styleUrls: ['./text-card.component.scss']
})
export class TextCardComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() icon: SafeHtml | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
