import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepFormComponent } from './project-step-form.component';

describe('ProjectStepFormComponent', () => {
  let component: ProjectStepFormComponent;
  let fixture: ComponentFixture<ProjectStepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStepFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
