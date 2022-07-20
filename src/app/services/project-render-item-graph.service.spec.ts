import { TestBed } from '@angular/core/testing';

import { ProjectRenderItemGraphService } from './project-render-item-graph.service';

describe('ProjectRenderItemGraphService', () => {
  let service: ProjectRenderItemGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectRenderItemGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
