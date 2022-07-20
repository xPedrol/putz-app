import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHeaderTitleComponent } from './detail-header-title.component';

describe('DetailHeaderTitleComponent', () => {
  let component: DetailHeaderTitleComponent;
  let fixture: ComponentFixture<DetailHeaderTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailHeaderTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHeaderTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
