import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHeaderSubtitleComponent } from './detail-header-subtitle.component';

describe('DetailHeaderSubtitleComponent', () => {
  let component: DetailHeaderSubtitleComponent;
  let fixture: ComponentFixture<DetailHeaderSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailHeaderSubtitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHeaderSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
