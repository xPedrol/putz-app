import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormWineComponent } from './render-form-wine.component';

describe('RenderFormWineComponent', () => {
  let component: RenderFormWineComponent;
  let fixture: ComponentFixture<RenderFormWineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormWineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormWineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
