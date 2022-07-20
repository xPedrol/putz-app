import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedNamesDialogComponent } from './approved-names-dialog.component';

describe('ApprovedNamesDialogComponent', () => {
  let component: ApprovedNamesDialogComponent;
  let fixture: ComponentFixture<ApprovedNamesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedNamesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedNamesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
