import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityOpenedRequestsComponent } from './opportunity-opened-requests.component';

describe('OpportunityOpenedRequestsComponent', () => {
  let component: OpportunityOpenedRequestsComponent;
  let fixture: ComponentFixture<OpportunityOpenedRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityOpenedRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityOpenedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
