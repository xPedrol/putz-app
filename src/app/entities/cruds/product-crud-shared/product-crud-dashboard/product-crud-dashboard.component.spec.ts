import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCrudDashboardComponent } from './product-crud-dashboard.component';

describe('ProductCrudDashboardComponent', () => {
  let component: ProductCrudDashboardComponent;
  let fixture: ComponentFixture<ProductCrudDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCrudDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCrudDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
