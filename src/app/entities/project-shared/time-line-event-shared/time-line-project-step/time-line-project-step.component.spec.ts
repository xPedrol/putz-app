import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineProjectStepComponent } from './time-line-project-step.component';

describe('TimeLineProjectStepComponent', () => {
  let component: TimeLineProjectStepComponent;
  let fixture: ComponentFixture<TimeLineProjectStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineProjectStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineProjectStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
