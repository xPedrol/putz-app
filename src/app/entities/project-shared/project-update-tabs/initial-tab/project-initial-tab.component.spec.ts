import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInitialTabComponent } from './project-initial-tab.component';

describe('InitialTabComponent', () => {
  let component: ProjectInitialTabComponent;
  let fixture: ComponentFixture<ProjectInitialTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInitialTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInitialTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
