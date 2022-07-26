import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScheduleDateSyncDialogComponent } from './project-schedule-date-sync-dialog.component';

describe('ProjectScheduleDateSyncDialogComponent', () => {
  let component: ProjectScheduleDateSyncDialogComponent;
  let fixture: ComponentFixture<ProjectScheduleDateSyncDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectScheduleDateSyncDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScheduleDateSyncDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
