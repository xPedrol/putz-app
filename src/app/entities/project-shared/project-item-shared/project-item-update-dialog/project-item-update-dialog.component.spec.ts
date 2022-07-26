import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemUpdateDialogComponent } from './project-item-update-dialog.component';

describe('ProjectItemDialogComponent', () => {
  let component: ProjectItemUpdateDialogComponent;
  let fixture: ComponentFixture<ProjectItemUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
