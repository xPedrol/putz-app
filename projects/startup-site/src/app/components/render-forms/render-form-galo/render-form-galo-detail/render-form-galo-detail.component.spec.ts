import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormGaloDetailComponent } from './render-form-galo-detail.component';

describe('RenderFormGaloDetailComponent', () => {
  let component: RenderFormGaloDetailComponent;
  let fixture: ComponentFixture<RenderFormGaloDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormGaloDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormGaloDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
