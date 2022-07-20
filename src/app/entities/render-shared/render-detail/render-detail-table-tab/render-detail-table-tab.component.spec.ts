import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDetailTableTabComponent } from './render-detail-table-tab.component';

describe('RenderDetailTableTabComponent', () => {
  let component: RenderDetailTableTabComponent;
  let fixture: ComponentFixture<RenderDetailTableTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDetailTableTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDetailTableTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
