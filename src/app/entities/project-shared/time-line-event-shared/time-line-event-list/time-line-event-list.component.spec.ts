import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEventListComponent } from './time-line-event-list.component';

describe('TimeLineEventListComponent', () => {
  let component: TimeLineEventListComponent;
  let fixture: ComponentFixture<TimeLineEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
