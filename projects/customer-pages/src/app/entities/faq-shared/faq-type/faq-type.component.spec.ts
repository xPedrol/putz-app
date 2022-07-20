import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqTypeComponent } from './faq-type.component';

describe('FaqTypeComponent', () => {
  let component: FaqTypeComponent;
  let fixture: ComponentFixture<FaqTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
