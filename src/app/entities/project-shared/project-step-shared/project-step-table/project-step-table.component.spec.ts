import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepTableComponent } from './project-step-table.component';

describe('ProjectStepTableComponent', () => {
  let component: ProjectStepTableComponent;
  let fixture: ComponentFixture<ProjectStepTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStepTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStepTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
