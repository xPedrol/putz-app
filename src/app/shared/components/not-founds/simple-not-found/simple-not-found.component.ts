import {Component, Input, OnInit} from '@angular/core';
import {NbComponentSize, NbTagAppearance} from '@nebular/theme';

@Component({
  selector: 'app-simple-not-found',
  templateUrl: './simple-not-found.component.html',
  styleUrls: ['./simple-not-found.component.css']
})
export class SimpleNotFoundComponent implements OnInit {
  @Input() appearance: NbTagAppearance = 'filled';
  @Input() size: NbComponentSize = 'medium';
  @Input() message:string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
