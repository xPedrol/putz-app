import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormVotoLulaFieldsComponent } from './render-form-voto-lula-fields.component';

describe('RenderFormVotoLulaFieldsComponent', () => {
  let component: RenderFormVotoLulaFieldsComponent;
  let fixture: ComponentFixture<RenderFormVotoLulaFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormVotoLulaFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormVotoLulaFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
