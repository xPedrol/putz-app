import {Component, Input, OnInit} from '@angular/core';
import {portifolioExample} from './portifolio-example'

@Component({
  selector: 'app-portifolio-grid',
  templateUrl: './portifolio-grid.component.html',
  styleUrls: ['./portifolio-grid.component.scss']
})
export class PortifolioGridComponent implements OnInit {

  @Input() public slides = portifolioExample;
  @Input() public title = "Ultimos Projetos";
  @Input() public category = "Projetos";

  constructor() { }

  ngOnInit(): void {
  }

}
