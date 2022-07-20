import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormCriativaComponent } from './render-form-criativa.component';

describe('RenderFormCriativaComponent', () => {
  let component: RenderFormCriativaComponent;
  let fixture: ComponentFixture<RenderFormCriativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormCriativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormCriativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
