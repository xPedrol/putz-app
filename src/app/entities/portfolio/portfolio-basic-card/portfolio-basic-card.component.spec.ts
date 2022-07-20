import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioBasicCardComponent } from './portfolio-basic-card.component';

describe('PortfolioBasicCardComponent', () => {
  let component: PortfolioBasicCardComponent;
  let fixture: ComponentFixture<PortfolioBasicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioBasicCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioBasicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
