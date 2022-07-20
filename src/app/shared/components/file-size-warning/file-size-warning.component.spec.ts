import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSizeWarningComponent } from './file-size-warning.component';

describe('FileSizeWarningComponent', () => {
  let component: FileSizeWarningComponent;
  let fixture: ComponentFixture<FileSizeWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSizeWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSizeWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
