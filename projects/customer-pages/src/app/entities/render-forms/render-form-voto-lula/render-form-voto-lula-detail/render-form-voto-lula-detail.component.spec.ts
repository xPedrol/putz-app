import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormVotoLulaDetailComponent } from './render-form-voto-lula-detail.component';

describe('RenderFormFranqDetailComponent', () => {
  let component: RenderFormVotoLulaDetailComponent;
  let fixture: ComponentFixture<RenderFormVotoLulaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormVotoLulaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormVotoLulaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
