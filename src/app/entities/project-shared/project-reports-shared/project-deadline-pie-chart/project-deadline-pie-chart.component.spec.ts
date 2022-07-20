import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeadlinePieChartComponent } from './project-deadline-pie-chart.component';

describe('ProjectDeadlinePieChartComponent', () => {
  let component: ProjectDeadlinePieChartComponent;
  let fixture: ComponentFixture<ProjectDeadlinePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDeadlinePieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDeadlinePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
