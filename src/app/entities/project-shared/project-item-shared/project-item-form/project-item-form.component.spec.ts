import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemFormComponent } from './project-item-form.component';

describe('ProjectItemFormComponent', () => {
  let component: ProjectItemFormComponent;
  let fixture: ComponentFixture<ProjectItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
