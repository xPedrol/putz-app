import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormGaloPocDetailComponent } from './render-form-galo-poc-detail.component';

describe('RenderFormGaloDetailComponent', () => {
  let component: RenderFormGaloPocDetailComponent;
  let fixture: ComponentFixture<RenderFormGaloPocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormGaloPocDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormGaloPocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
