import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPersonDialogComponent } from './basic-person-dialog.component';

describe('BasicPersonDialogComponent', () => {
  let component: BasicPersonDialogComponent;
  let fixture: ComponentFixture<BasicPersonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPersonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
