import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemDetailDialogComponent } from './project-item-detail-dialog.component';

describe('ProjectItemDetailDialogComponent', () => {
  let component: ProjectItemDetailDialogComponent;
  let fixture: ComponentFixture<ProjectItemDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
