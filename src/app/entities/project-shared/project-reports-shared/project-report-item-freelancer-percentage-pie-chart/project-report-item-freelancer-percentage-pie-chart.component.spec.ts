import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportItemFreelancerPercentagePieChartComponent } from './project-report-item-freelancer-percentage-pie-chart.component';

describe('ProjectReportItemFreelancerPercentagePieChartComponent', () => {
  let component: ProjectReportItemFreelancerPercentagePieChartComponent;
  let fixture: ComponentFixture<ProjectReportItemFreelancerPercentagePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectReportItemFreelancerPercentagePieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReportItemFreelancerPercentagePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
