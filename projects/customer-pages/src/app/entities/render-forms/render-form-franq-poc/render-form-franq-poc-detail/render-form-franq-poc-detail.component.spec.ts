import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormFranqPocDetailComponent } from './render-form-franq-poc-detail.component';

describe('RenderFormFranqDetailComponent', () => {
  let component: RenderFormFranqPocDetailComponent;
  let fixture: ComponentFixture<RenderFormFranqPocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormFranqPocDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormFranqPocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
