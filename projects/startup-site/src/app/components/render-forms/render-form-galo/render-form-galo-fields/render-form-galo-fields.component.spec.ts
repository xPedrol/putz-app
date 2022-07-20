import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormGaloFieldsComponent } from './render-form-galo-fields.component';

describe('RenderFormGaloFieldsComponent', () => {
  let component: RenderFormGaloFieldsComponent;
  let fixture: ComponentFixture<RenderFormGaloFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormGaloFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormGaloFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
