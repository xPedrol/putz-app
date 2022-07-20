import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepDialogComponent } from './project-step-dialog.component';

describe('ProjectStepDialogComponent', () => {
  let component: ProjectStepDialogComponent;
  let fixture: ComponentFixture<ProjectStepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStepDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
