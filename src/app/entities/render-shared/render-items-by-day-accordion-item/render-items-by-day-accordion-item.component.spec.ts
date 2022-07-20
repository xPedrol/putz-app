import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderItemsByDayAccordionItemComponent } from './render-items-by-day-accordion-item.component';

describe('RenderItensByDayAccordionItemComponent', () => {
  let component: RenderItemsByDayAccordionItemComponent;
  let fixture: ComponentFixture<RenderItemsByDayAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderItemsByDayAccordionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderItemsByDayAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
