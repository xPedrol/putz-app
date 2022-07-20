import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormFeedbackDetailComponent } from './render-form-feedback-detail.component';

describe('RenderFormFeedbackDetailComponent', () => {
  let component: RenderFormFeedbackDetailComponent;
  let fixture: ComponentFixture<RenderFormFeedbackDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormFeedbackDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormFeedbackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
