import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPromoComponent } from './components-promo.component';

describe('ComponentsPromoComponent', () => {
  let component: ComponentsPromoComponent;
  let fixture: ComponentFixture<ComponentsPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
