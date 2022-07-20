import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemDialogComponent } from './project-item-dialog.component';

describe('ProjectItemDialogComponent', () => {
  let component: ProjectItemDialogComponent;
  let fixture: ComponentFixture<ProjectItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
