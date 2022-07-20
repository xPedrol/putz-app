import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCaseTableComponent } from './project-case-table.component';

describe('ProjectCaseTableComponent', () => {
  let component: ProjectCaseTableComponent;
  let fixture: ComponentFixture<ProjectCaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
