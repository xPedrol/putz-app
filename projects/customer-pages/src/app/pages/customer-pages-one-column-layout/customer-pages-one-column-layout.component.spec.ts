import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPagesOneColumnLayoutComponent } from './customer-pages-one-column-layout.component';

describe('PagesLayoutComponent', () => {
  let component: CustomerPagesOneColumnLayoutComponent;
  let fixture: ComponentFixture<CustomerPagesOneColumnLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPagesOneColumnLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPagesOneColumnLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
