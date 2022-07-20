import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPersonFormComponent } from './basic-person-form.component';

describe('BasicPersonFormComponent', () => {
  let component: BasicPersonFormComponent;
  let fixture: ComponentFixture<BasicPersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPersonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicPersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
