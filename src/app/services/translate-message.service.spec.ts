import { TestBed } from '@angular/core/testing';

import { TranslateMessageService } from './translate-message.service';

describe('TranslateMessageService', () => {
  let service: TranslateMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
