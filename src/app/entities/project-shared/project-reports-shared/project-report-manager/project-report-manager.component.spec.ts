import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportManagerComponent } from './project-report-manager.component';

describe('ProjectReportManagerComponent', () => {
  let component: ProjectReportManagerComponent;
  let fixture: ComponentFixture<ProjectReportManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectReportManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReportManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
