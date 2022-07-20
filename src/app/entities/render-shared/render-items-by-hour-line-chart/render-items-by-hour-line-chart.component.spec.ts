import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderItemsByHourLineChartComponent } from './render-items-by-hour-line-chart.component';

describe('RenderItemsByHourLineChartComponent', () => {
  let component: RenderItemsByHourLineChartComponent;
  let fixture: ComponentFixture<RenderItemsByHourLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderItemsByHourLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderItemsByHourLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
