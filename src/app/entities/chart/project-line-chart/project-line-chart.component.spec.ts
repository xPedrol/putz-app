import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLineChartComponent } from './project-line-chart.component';

describe('ProjectLineChartComponent', () => {
  let component: ProjectLineChartComponent;
  let fixture: ComponentFixture<ProjectLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLineChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
