import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCostAndSaleBarChartComponent } from './project-cost-and-sale-bar-chart.component';

describe('ProjectCostAndSaleGraphComponent', () => {
  let component: ProjectCostAndSaleBarChartComponent;
  let fixture: ComponentFixture<ProjectCostAndSaleBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCostAndSaleBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCostAndSaleBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
