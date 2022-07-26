import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormButtonsComponent } from './render-form-buttons.component';

describe('RenderFormButtonsComponent', () => {
  let component: RenderFormButtonsComponent;
  let fixture: ComponentFixture<RenderFormButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
