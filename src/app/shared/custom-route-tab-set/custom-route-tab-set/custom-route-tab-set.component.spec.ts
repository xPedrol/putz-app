import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRouteTabSetComponent } from './custom-route-tab-set.component';

describe('CustomRouteTabSetComponent', () => {
  let component: CustomRouteTabSetComponent;
  let fixture: ComponentFixture<CustomRouteTabSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRouteTabSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRouteTabSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
