import { TestBed } from '@angular/core/testing';

import { ProjectCaseService } from './project-case.service';

describe('ProjectCaseService', () => {
  let service: ProjectCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
