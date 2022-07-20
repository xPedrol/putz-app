import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEventEvaluationDialogComponent } from './time-line-event-evaluation-dialog.component';

describe('TimeLineEventEvaluationDialogComponent', () => {
  let component: TimeLineEventEvaluationDialogComponent;
  let fixture: ComponentFixture<TimeLineEventEvaluationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineEventEvaluationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineEventEvaluationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
