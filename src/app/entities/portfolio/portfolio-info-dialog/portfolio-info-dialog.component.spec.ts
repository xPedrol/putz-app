import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioInfoDialogComponent } from './portfolio-info-dialog.component';

describe('PortfolioInfoDialogComponent', () => {
  let component: PortfolioInfoDialogComponent;
  let fixture: ComponentFixture<PortfolioInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
