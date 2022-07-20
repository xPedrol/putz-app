import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGuidedTourDialogComponent } from './dashboard-guided-tour-dialog.component';

describe('DashboardGuidedTourDialogComponent', () => {
  let component: DashboardGuidedTourDialogComponent;
  let fixture: ComponentFixture<DashboardGuidedTourDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGuidedTourDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGuidedTourDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
