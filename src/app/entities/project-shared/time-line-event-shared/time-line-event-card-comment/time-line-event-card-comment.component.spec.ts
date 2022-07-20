import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEventCardCommentComponent } from './time-line-event-card-comment.component';

describe('TimeLineEventCardCommentComponent', () => {
  let component: TimeLineEventCardCommentComponent;
  let fixture: ComponentFixture<TimeLineEventCardCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineEventCardCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineEventCardCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
