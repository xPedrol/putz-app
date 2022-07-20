import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormWrapperComponent } from './render-form-wrapper.component';

describe('RenderFormTabComponent', () => {
  let component: RenderFormWrapperComponent;
  let fixture: ComponentFixture<RenderFormWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
