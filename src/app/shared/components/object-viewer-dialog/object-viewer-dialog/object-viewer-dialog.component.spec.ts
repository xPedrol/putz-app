import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectViewerDialogComponent } from './object-viewer-dialog.component';

describe('ObjectViewerDialogComponent', () => {
  let component: ObjectViewerDialogComponent;
  let fixture: ComponentFixture<ObjectViewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectViewerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
