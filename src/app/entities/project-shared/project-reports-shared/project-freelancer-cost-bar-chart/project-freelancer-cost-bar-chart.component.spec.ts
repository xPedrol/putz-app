import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFreelancerCostBarChartComponent } from './project-freelancer-cost-bar-chart.component';

describe('ProjectFreelancerCostBarChartComponent', () => {
  let component: ProjectFreelancerCostBarChartComponent;
  let fixture: ComponentFixture<ProjectFreelancerCostBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFreelancerCostBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFreelancerCostBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
