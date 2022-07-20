import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRenderErrorsDialogComponent } from './project-render-errors-dialog.component';

describe('ProjectRenderErrorsDialogComponent', () => {
  let component: ProjectRenderErrorsDialogComponent;
  let fixture: ComponentFixture<ProjectRenderErrorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRenderErrorsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRenderErrorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
