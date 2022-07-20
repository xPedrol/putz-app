import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormGaloPocComponent } from './render-form-galo-poc.component';

describe('RenderFormGaloComponent', () => {
  let component: RenderFormGaloPocComponent;
  let fixture: ComponentFixture<RenderFormGaloPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormGaloPocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormGaloPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
