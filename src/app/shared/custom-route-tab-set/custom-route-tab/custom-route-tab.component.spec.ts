import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRouteTabComponent } from './custom-route-tab.component';

describe('CustomRouteTabComponent', () => {
  let component: CustomRouteTabComponent;
  let fixture: ComponentFixture<CustomRouteTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRouteTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRouteTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
