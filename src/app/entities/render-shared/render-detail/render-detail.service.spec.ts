import { TestBed } from '@angular/core/testing';

import { RenderDetailService } from './render-detail.service';

describe('RenderDetailService', () => {
  let service: RenderDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
