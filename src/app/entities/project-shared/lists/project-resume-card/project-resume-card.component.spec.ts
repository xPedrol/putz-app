import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectResumeCardComponent } from './project-resume-card.component';

describe('ProjectResumeCardComponent', () => {
  let component: ProjectResumeCardComponent;
  let fixture: ComponentFixture<ProjectResumeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectResumeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectResumeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
