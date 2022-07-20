import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderClientDetailComponent } from './render-client-detail.component';

describe('RenderClientDetailComponent', () => {
  let component: RenderClientDetailComponent;
  let fixture: ComponentFixture<RenderClientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderClientDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
