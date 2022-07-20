import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectConceptionCardComponent } from './project-conception-card.component';

describe('ProjectConceptionCardComponent', () => {
  let component: ProjectConceptionCardComponent;
  let fixture: ComponentFixture<ProjectConceptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectConceptionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectConceptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
