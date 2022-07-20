import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderItemsByDayLineChartComponent } from './render-items-by-day-line-chart.component';

describe('RenderItemsByDayLineChartComponent', () => {
  let component: RenderItemsByDayLineChartComponent;
  let fixture: ComponentFixture<RenderItemsByDayLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderItemsByDayLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderItemsByDayLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
