import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProjectIdDialogComponent } from './no-project-id-dialog.component';

describe('NoProjectIdDialogComponent', () => {
  let component: NoProjectIdDialogComponent;
  let fixture: ComponentFixture<NoProjectIdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoProjectIdDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoProjectIdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
