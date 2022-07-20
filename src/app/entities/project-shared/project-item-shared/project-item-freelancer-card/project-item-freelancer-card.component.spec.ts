import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemFreelancerCardComponent } from './project-item-freelancer-card.component';

describe('ProjectItemFreelancerCardComponent', () => {
  let component: ProjectItemFreelancerCardComponent;
  let fixture: ComponentFixture<ProjectItemFreelancerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemFreelancerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemFreelancerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
