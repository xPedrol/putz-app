import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormDetailFooterComponent } from './render-form-detail-footer.component';

describe('RenderFormDetailFooterComponent', () => {
  let component: RenderFormDetailFooterComponent;
  let fixture: ComponentFixture<RenderFormDetailFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormDetailFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormDetailFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
