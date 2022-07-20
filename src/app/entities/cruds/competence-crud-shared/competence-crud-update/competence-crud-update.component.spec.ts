import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceCrudUpdateComponent } from './competence-crud-update.component';

describe('CompetenceCrudUpdateComponent', () => {
  let component: CompetenceCrudUpdateComponent;
  let fixture: ComponentFixture<CompetenceCrudUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceCrudUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceCrudUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
