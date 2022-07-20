import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleFormComponent } from './handle-form.component';

describe('HandleFormComponent', () => {
  let component: HandleFormComponent;
  let fixture: ComponentFixture<HandleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
