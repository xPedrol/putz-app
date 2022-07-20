import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormWineFieldsComponent } from './render-form-wine-fields.component';

describe('RenderFormFieldsComponent', () => {
  let component: RenderFormWineFieldsComponent;
  let fixture: ComponentFixture<RenderFormWineFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormWineFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormWineFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
