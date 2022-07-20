import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForBusinessComponent } from './for-business.component';

describe('ForBusinessComponent', () => {
  let component: ForBusinessComponent;
  let fixture: ComponentFixture<ForBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
