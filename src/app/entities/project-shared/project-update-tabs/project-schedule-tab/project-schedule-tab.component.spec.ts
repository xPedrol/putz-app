import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScheduleTabComponent } from './project-schedule-tab.component';

describe('ProjectScheduleTabComponent', () => {
  let component: ProjectScheduleTabComponent;
  let fixture: ComponentFixture<ProjectScheduleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectScheduleTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScheduleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
