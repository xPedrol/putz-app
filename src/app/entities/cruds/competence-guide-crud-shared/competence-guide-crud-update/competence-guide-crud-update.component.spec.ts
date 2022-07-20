import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceGuideCrudUpdateComponent } from './competence-guide-crud-update.component';

describe('CompetenceGuideCrudUpdateComponent', () => {
  let component: CompetenceGuideCrudUpdateComponent;
  let fixture: ComponentFixture<CompetenceGuideCrudUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceGuideCrudUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceGuideCrudUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
