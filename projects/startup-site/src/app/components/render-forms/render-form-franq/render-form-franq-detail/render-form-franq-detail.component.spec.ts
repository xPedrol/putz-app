import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormFranqDetailComponent } from './render-form-franq-detail.component';

describe('RenderFormFranqDetailComponent', () => {
  let component: RenderFormFranqDetailComponent;
  let fixture: ComponentFixture<RenderFormFranqDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormFranqDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormFranqDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
