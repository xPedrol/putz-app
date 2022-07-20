import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormCriativaDetailComponent } from './render-form-criativa-detail.component';

describe('RenderFormCriativaDetailComponent', () => {
  let component: RenderFormCriativaDetailComponent;
  let fixture: ComponentFixture<RenderFormCriativaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormCriativaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormCriativaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
