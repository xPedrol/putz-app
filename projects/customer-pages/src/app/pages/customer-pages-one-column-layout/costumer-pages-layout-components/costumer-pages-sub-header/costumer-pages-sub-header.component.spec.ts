import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerPagesSubHeaderComponent } from './costumer-pages-sub-header.component';

describe('CostumerPagesSubHeaderComponent', () => {
  let component: CostumerPagesSubHeaderComponent;
  let fixture: ComponentFixture<CostumerPagesSubHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostumerPagesSubHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumerPagesSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
