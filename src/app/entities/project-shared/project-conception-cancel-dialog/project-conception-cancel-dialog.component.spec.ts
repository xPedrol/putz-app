import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectConceptionCancelDialogComponent } from './project-conception-cancel-dialog.component';

describe('ProjectConceptionCancelDialogComponent', () => {
  let component: ProjectConceptionCancelDialogComponent;
  let fixture: ComponentFixture<ProjectConceptionCancelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectConceptionCancelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectConceptionCancelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
