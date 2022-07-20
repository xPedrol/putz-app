import { TestBed } from '@angular/core/testing';

import { ProjectGraphService } from './project-graph.service';

describe('ProjectGraphService', () => {
  let service: ProjectGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
