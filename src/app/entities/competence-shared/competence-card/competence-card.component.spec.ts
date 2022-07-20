import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceCardComponent } from './competence-card.component';

describe('CompetenceCardComponent', () => {
  let component: CompetenceCardComponent;
  let fixture: ComponentFixture<CompetenceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
