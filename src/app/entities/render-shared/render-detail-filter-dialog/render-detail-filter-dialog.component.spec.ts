import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDetailFilterDialogComponent } from './render-detail-filter-dialog.component';

describe('RenderDetailFilterDialogComponent', () => {
  let component: RenderDetailFilterDialogComponent;
  let fixture: ComponentFixture<RenderDetailFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDetailFilterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDetailFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
