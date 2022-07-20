import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContractTabComponent } from './project-contract-tab.component';

describe('ProjectContractTabComponent', () => {
  let component: ProjectContractTabComponent;
  let fixture: ComponentFixture<ProjectContractTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContractTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContractTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
