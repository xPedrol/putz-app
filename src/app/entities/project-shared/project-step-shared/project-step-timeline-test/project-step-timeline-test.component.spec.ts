import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepTimelineTestComponent } from './project-step-timeline-test.component';

describe('ProjectStepTimelineTestComponent', () => {
  let component: ProjectStepTimelineTestComponent;
  let fixture: ComponentFixture<ProjectStepTimelineTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStepTimelineTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStepTimelineTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
