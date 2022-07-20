import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseHeroComponent } from './base-hero.component';

describe('BaseHeroComponent', () => {
  let component: BaseHeroComponent;
  let fixture: ComponentFixture<BaseHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
