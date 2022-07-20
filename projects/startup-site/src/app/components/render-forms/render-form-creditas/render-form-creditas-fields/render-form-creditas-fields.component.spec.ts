import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormCreditasFieldsComponent } from './render-form-creditas-fields.component';

describe('RenderFormCreditasFieldsComponent', () => {
  let component: RenderFormCreditasFieldsComponent;
  let fixture: ComponentFixture<RenderFormCreditasFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormCreditasFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormCreditasFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
