import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEventCardComponent } from './time-line-event-card.component';

describe('TimeLineEventCardComponent', () => {
  let component: TimeLineEventCardComponent;
  let fixture: ComponentFixture<TimeLineEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
