import { TestBed } from '@angular/core/testing';

import { ConfigButtonsService } from './config-buttons.service';

describe('ConfigButtonsService', () => {
  let service: ConfigButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
