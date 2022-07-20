import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCaseCrudUpdateComponent } from './project-case-crud-update.component';

describe('ProjectCaseUpdateComponent', () => {
  let component: ProjectCaseCrudUpdateComponent;
  let fixture: ComponentFixture<ProjectCaseCrudUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCaseCrudUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCaseCrudUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
