import { TestBed } from '@angular/core/testing';

import { DashboardFreelancerGuard } from './dashboard-freelancer-guard.service';

describe('DashboardFreelancerGuardService', () => {
  let service: DashboardFreelancerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardFreelancerGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
