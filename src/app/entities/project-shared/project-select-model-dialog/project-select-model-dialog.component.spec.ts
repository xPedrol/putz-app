import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSelectModelDialogComponent } from './project-select-model-dialog.component';

describe('ProjectSelectModelDialogComponent', () => {
  let component: ProjectSelectModelDialogComponent;
  let fixture: ComponentFixture<ProjectSelectModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSelectModelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSelectModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
