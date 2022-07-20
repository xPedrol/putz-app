import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormDetailHeaderComponent } from './render-form-detail-header.component';

describe('RenderFormDetailHeaderComponent', () => {
  let component: RenderFormDetailHeaderComponent;
  let fixture: ComponentFixture<RenderFormDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormDetailHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
