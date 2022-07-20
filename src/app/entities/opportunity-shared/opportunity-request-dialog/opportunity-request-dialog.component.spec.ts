import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityRequestDialogComponent } from './opportunity-request-dialog.component';

describe('OpportunityRequestDialogComponent', () => {
  let component: OpportunityRequestDialogComponent;
  let fixture: ComponentFixture<OpportunityRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityRequestDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
