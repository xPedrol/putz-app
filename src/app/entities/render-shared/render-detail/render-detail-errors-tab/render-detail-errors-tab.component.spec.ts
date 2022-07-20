import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDetailErrorsTabComponent } from './render-detail-errors-tab.component';

describe('RenderDetailErrorsTabComponent', () => {
  let component: RenderDetailErrorsTabComponent;
  let fixture: ComponentFixture<RenderDetailErrorsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDetailErrorsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDetailErrorsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
