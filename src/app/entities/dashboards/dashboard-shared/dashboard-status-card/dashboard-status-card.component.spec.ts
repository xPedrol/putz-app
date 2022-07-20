import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatusCardComponent } from './dashboard-status-card.component';

describe('DashboardStatusCardComponent', () => {
  let component: DashboardStatusCardComponent;
  let fixture: ComponentFixture<DashboardStatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStatusCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
