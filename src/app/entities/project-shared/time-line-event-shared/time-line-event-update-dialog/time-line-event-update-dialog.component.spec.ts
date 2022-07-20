import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineEventUpdateDialogComponent } from './time-line-event-update-dialog.component';

describe('TimeLineEventDetailDialogComponent', () => {
  let component: TimeLineEventUpdateDialogComponent;
  let fixture: ComponentFixture<TimeLineEventUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLineEventUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLineEventUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
