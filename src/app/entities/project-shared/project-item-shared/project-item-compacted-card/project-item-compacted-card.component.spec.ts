import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemCompactedCardComponent } from './project-item-compacted-card.component';

describe('ProjectItemCardComponent', () => {
  let component: ProjectItemCompactedCardComponent;
  let fixture: ComponentFixture<ProjectItemCompactedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectItemCompactedCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemCompactedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
