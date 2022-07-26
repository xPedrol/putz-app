import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStepUpdateDialogComponent } from './project-step-update-dialog.component';

describe('ProjectStepDialogComponent', () => {
  let component: ProjectStepUpdateDialogComponent;
  let fixture: ComponentFixture<ProjectStepUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStepUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStepUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
