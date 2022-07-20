import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormCreditasDetailComponent } from './render-form-creditas-detail.component';

describe('RenderFormCreditasDetailComponent', () => {
  let component: RenderFormCreditasDetailComponent;
  let fixture: ComponentFixture<RenderFormCreditasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormCreditasDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormCreditasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
