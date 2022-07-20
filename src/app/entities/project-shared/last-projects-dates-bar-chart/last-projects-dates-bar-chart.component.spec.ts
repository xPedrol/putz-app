import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastProjectsDatesBarChartComponent } from './last-projects-dates-bar-chart.component';

describe('LastSubmissionDatesBarChartComponent', () => {
  let component: LastProjectsDatesBarChartComponent;
  let fixture: ComponentFixture<LastProjectsDatesBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastProjectsDatesBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastProjectsDatesBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
