import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppOneColumnLayoutComponent } from './main-app-one-column-layout.component';

describe('OneColumnLayoutComponent', () => {
  let component: MainAppOneColumnLayoutComponent;
  let fixture: ComponentFixture<MainAppOneColumnLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAppOneColumnLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAppOneColumnLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
