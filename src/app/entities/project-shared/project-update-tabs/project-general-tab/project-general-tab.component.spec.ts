import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGeneralTabComponent } from './project-general-tab.component';

describe('ProjectGeneralTabComponent', () => {
  let component: ProjectGeneralTabComponent;
  let fixture: ComponentFixture<ProjectGeneralTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectGeneralTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
