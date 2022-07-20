import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderItemsByMonthLineChartComponent } from './render-items-by-month-line-chart.component';

describe('RenderItensByMonthLineChartComponent', () => {
  let component: RenderItemsByMonthLineChartComponent;
  let fixture: ComponentFixture<RenderItemsByMonthLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderItemsByMonthLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderItemsByMonthLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
