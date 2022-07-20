import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserRequestComponent } from './activate-user-request.component';

describe('ActivateUserRequestComponent', () => {
  let component: ActivateUserRequestComponent;
  let fixture: ComponentFixture<ActivateUserRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateUserRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUserRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
