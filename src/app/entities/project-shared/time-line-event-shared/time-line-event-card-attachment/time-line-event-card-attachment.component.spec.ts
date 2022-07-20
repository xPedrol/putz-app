import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEventCardAttachmentComponent } from './time-line-event-card-attachment.component';

describe('TimeLineEventCardAttachmentComponent', () => {
  let component: TimeLineEventCardAttachmentComponent;
  let fixture: ComponentFixture<TimeLineEventCardAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineEventCardAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineEventCardAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
