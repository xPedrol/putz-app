import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormAgbaraComponent } from './render-form-agbara.component';

describe('RenderFormAgbaraComponent', () => {
  let component: RenderFormAgbaraComponent;
  let fixture: ComponentFixture<RenderFormAgbaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormAgbaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormAgbaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
