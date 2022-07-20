import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceTableComponent } from './competence-table.component';

describe('CompetenceTableComponent', () => {
  let component: CompetenceTableComponent;
  let fixture: ComponentFixture<CompetenceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
