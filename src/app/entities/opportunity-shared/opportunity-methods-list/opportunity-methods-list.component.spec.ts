import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityMethodsListComponent } from './opportunity-methods-list.component';

describe('OpportunityMethodsListComponent', () => {
  let component: OpportunityMethodsListComponent;
  let fixture: ComponentFixture<OpportunityMethodsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityMethodsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityMethodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
