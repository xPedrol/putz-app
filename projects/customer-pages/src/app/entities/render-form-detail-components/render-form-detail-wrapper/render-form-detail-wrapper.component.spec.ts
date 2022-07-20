import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormDetailWrapperComponent } from './render-form-detail-wrapper.component';

describe('RenderFormDetailWrapperComponent', () => {
  let component: RenderFormDetailWrapperComponent;
  let fixture: ComponentFixture<RenderFormDetailWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormDetailWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormDetailWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
