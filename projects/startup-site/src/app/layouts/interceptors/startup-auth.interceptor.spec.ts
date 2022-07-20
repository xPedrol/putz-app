import { TestBed } from '@angular/core/testing';

import { StartupAuthInterceptor } from './startup-auth.interceptor';

describe('StartupAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StartupAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: StartupAuthInterceptor = TestBed.inject(StartupAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
