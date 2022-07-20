import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IPortfolio} from '../../../models/portfolio.model';

@Component({
  selector: 'app-portfolio-basic-card',
  templateUrl: './portfolio-basic-card.component.html',
  styleUrls: ['./portfolio-basic-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioBasicCardComponent implements OnInit {
  @Input() portfolio: IPortfolio | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
