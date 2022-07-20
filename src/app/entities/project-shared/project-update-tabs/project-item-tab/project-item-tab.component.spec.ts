import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemTabComponent } from './project-item-tab.component';

describe('ProjectItemTabComponent', () => {
  let component: ProjectItemTabComponent;
  let fixture: ComponentFixture<ProjectItemTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
