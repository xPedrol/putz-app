import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedNotFoundComponent } from './detailed-not-found.component';

describe('CardNotFoundDetailComponent', () => {
  let component: DetailedNotFoundComponent;
  let fixture: ComponentFixture<DetailedNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
