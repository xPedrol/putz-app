import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderExportCsvConfirmDialogComponent } from './render-export-csv-confirm-dialog.component';

describe('RenderExportCsvConfirmDialogComponent', () => {
  let component: RenderExportCsvConfirmDialogComponent;
  let fixture: ComponentFixture<RenderExportCsvConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderExportCsvConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderExportCsvConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
