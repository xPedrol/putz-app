import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCaseCrudDashboardComponent } from './project-case-crud-dashboard.component';

describe('ProjectCaseCrudDashboardComponent', () => {
  let component: ProjectCaseCrudDashboardComponent;
  let fixture: ComponentFixture<ProjectCaseCrudDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCaseCrudDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCaseCrudDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
