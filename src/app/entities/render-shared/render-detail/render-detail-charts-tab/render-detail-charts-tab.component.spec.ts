import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDetailChartsTabComponent } from './render-detail-charts-tab.component';

describe('RenderDetailChartsTabComponent', () => {
  let component: RenderDetailChartsTabComponent;
  let fixture: ComponentFixture<RenderDetailChartsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDetailChartsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDetailChartsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
