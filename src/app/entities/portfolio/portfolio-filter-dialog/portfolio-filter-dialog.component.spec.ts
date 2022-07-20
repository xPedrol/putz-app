import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioFilterDialogComponent } from './portfolio-filter-dialog.component';

describe('PortfolioFilterDialogComponent', () => {
  let component: PortfolioFilterDialogComponent;
  let fixture: ComponentFixture<PortfolioFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioFilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
