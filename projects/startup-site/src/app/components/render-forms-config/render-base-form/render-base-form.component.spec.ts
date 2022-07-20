import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderBaseFormComponent } from './render-base-form.component';

describe('RenderBaseFormComponent', () => {
  let component: RenderBaseFormComponent;
  let fixture: ComponentFixture<RenderBaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderBaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
