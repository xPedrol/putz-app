import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNoAccessTabComponent } from './project-no-access-tab.component';

describe('ProjectNoAccessTabComponent', () => {
  let component: ProjectNoAccessTabComponent;
  let fixture: ComponentFixture<ProjectNoAccessTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectNoAccessTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNoAccessTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
