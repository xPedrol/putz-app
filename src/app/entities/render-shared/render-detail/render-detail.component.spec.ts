import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDetailComponent } from './render-detail.component';

describe('RenderDetailComponent', () => {
  let component: RenderDetailComponent;
  let fixture: ComponentFixture<RenderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
