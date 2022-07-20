import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineAttachmentTableComponent } from './time-line-attachment-table.component';

describe('TimeLineAttachmentTableComponent', () => {
  let component: TimeLineAttachmentTableComponent;
  let fixture: ComponentFixture<TimeLineAttachmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineAttachmentTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineAttachmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
