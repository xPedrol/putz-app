import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqMenuComponent } from './faq-menu.component';

describe('FaqMenuComponent', () => {
  let component: FaqMenuComponent;
  let fixture: ComponentFixture<FaqMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
