import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEventUpdateFormComponent } from './time-line-event-update-form.component';

describe('TimeLineEventUpdateFormComponent', () => {
  let component: TimeLineEventUpdateFormComponent;
  let fixture: ComponentFixture<TimeLineEventUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineEventUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineEventUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
