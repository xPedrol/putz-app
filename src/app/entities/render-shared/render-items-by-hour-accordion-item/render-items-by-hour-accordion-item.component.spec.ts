import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderItemsByHourAccordionItemComponent } from './render-items-by-hour-accordion-item.component';

describe('RenderItemsByHourAccordionItemComponent', () => {
  let component: RenderItemsByHourAccordionItemComponent;
  let fixture: ComponentFixture<RenderItemsByHourAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderItemsByHourAccordionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderItemsByHourAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
