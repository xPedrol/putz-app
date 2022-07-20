import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportItemFreelancerPieChartComponent } from './project-report-item-freelancer-pie-chart.component';

describe('ProjectReportItemFreelancerPieChartComponent', () => {
  let component: ProjectReportItemFreelancerPieChartComponent;
  let fixture: ComponentFixture<ProjectReportItemFreelancerPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectReportItemFreelancerPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReportItemFreelancerPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
