import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceGuideCrudTableComponent } from './competence-guide-crud-table.component';

describe('CompetenceGuideCrudTableComponent', () => {
  let component: CompetenceGuideCrudTableComponent;
  let fixture: ComponentFixture<CompetenceGuideCrudTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceGuideCrudTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceGuideCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
