import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceCrudDashboardComponent } from './competence-crud-dashboard.component';

describe('CompetenceCrudDashboardComponent', () => {
  let component: CompetenceCrudDashboardComponent;
  let fixture: ComponentFixture<CompetenceCrudDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceCrudDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceCrudDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
