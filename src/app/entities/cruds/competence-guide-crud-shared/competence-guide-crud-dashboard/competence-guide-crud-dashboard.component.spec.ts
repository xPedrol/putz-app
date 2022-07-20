import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceGuideCrudDashboardComponent } from './competence-guide-crud-dashboard.component';

describe('CompetenceGuideCrudDashboardComponent', () => {
  let component: CompetenceGuideCrudDashboardComponent;
  let fixture: ComponentFixture<CompetenceGuideCrudDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceGuideCrudDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceGuideCrudDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
