import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResumeComponent } from './project-resume.component';

describe('ProjectResumeComponent', () => {
  let component: ProjectResumeComponent;
  let fixture: ComponentFixture<ProjectResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
