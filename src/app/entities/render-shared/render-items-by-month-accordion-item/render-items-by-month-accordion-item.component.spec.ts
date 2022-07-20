import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderItemsByMonthAccordionItemComponent } from './render-items-by-month-accordion-item.component';

describe('RenderItensByMonthAccordionItemComponent', () => {
  let component: RenderItemsByMonthAccordionItemComponent;
  let fixture: ComponentFixture<RenderItemsByMonthAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderItemsByMonthAccordionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderItemsByMonthAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
