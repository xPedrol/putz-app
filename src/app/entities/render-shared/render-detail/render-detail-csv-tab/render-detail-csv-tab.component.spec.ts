import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDetailCsvTabComponent } from './render-detail-csv-tab.component';

describe('RenderDetailCsvTabComponent', () => {
  let component: RenderDetailCsvTabComponent;
  let fixture: ComponentFixture<RenderDetailCsvTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDetailCsvTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDetailCsvTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
