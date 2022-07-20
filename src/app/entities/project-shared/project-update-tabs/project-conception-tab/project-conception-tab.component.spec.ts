import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectConceptionTabComponent } from './project-conception-tab.component';

describe('ProjectConceptionTabComponent', () => {
  let component: ProjectConceptionTabComponent;
  let fixture: ComponentFixture<ProjectConceptionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectConceptionTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectConceptionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
