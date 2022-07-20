import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormWineDetailComponent } from './render-form-wine-detail.component';

describe('RenderFormDetailComponent', () => {
  let component: RenderFormWineDetailComponent;
  let fixture: ComponentFixture<RenderFormWineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderFormWineDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderFormWineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
