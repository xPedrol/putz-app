import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineProjectStepCardComponent } from './time-line-project-step-card.component';

describe('TimeLineProjectStepCardComponent', () => {
  let component: TimeLineProjectStepCardComponent;
  let fixture: ComponentFixture<TimeLineProjectStepCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineProjectStepCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineProjectStepCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
