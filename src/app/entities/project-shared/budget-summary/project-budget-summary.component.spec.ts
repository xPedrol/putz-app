import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBudgetSummaryComponent } from './project-budget-summary.component';

describe('BudgetSummaryComponent', () => {
  let component: ProjectBudgetSummaryComponent;
  let fixture: ComponentFixture<ProjectBudgetSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectBudgetSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBudgetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
