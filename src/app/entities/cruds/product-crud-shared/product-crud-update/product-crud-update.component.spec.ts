import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCrudUpdateComponent } from './product-crud-update.component';

describe('ProductCrudUpdateComponent', () => {
  let component: ProductCrudUpdateComponent;
  let fixture: ComponentFixture<ProductCrudUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCrudUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCrudUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
