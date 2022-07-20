import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormFranqFieldsComponent } from './render-form-franq-fields.component';

describe('RenderFormFranqFieldsComponent', () => {
  let component: RenderFormFranqFieldsComponent;
  let fixture: ComponentFixture<RenderFormFranqFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormFranqFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormFranqFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
