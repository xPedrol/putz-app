import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormPocDetailComponent } from './render-form-poc-detail.component';

describe('RenderFormPocDetailComponent', () => {
  let component: RenderFormPocDetailComponent;
  let fixture: ComponentFixture<RenderFormPocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormPocDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormPocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
