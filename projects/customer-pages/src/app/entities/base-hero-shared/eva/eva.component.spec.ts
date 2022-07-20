import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaComponent } from './eva.component';

describe('EvaComponent', () => {
  let component: EvaComponent;
  let fixture: ComponentFixture<EvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
