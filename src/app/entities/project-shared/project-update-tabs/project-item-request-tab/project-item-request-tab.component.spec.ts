import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemRequestTabComponent } from './project-item-request-tab.component';

describe('ProjectItemRequestTabComponent', () => {
  let component: ProjectItemRequestTabComponent;
  let fixture: ComponentFixture<ProjectItemRequestTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemRequestTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemRequestTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
