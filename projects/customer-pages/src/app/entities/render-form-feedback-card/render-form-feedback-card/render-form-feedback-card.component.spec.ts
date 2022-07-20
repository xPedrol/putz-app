import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormFeedbackCardComponent } from './render-form-feedback-card.component';

describe('RenderFormFeedbackCardComponent', () => {
  let component: RenderFormFeedbackCardComponent;
  let fixture: ComponentFixture<RenderFormFeedbackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormFeedbackCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormFeedbackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
