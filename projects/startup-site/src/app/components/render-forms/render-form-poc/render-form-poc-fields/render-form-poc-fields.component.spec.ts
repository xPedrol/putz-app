import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormPocFieldsComponent } from './render-form-poc-fields.component';

describe('RenderFormPocFieldsComponent', () => {
  let component: RenderFormPocFieldsComponent;
  let fixture: ComponentFixture<RenderFormPocFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormPocFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormPocFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
