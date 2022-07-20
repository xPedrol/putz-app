import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProjectItem} from '../../../../models/project-item.model';
import {ProjectItemService} from '../../../../services/project-item.service';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-item-detail',
  templateUrl: './project-item-detail.component.html',
  styleUrls: ['./project-item-detail.component.scss','../../../../shared/themes/nebular-overrides.scss']
})
export class ProjectItemDetailComponent implements OnInit, OnDestroy {
  projectItem: IProjectItem | undefined;
  subject$: Subject<any>;

  constructor(
    private projectItemService: ProjectItemService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subject$ = new Subject<any>();
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    combineLatest(
      [
        this.activatedRoute.params,
        this.activatedRoute.data
      ]
    ).pipe(takeUntil(this.subject$)).subscribe(([params, data]) => {
      this.getProjectItem(params, data?.isOpportunity ?? false);
    });
  }

  getProjectItem({projectItemId, projectId}: any, opportunity = false): void {
    if (projectItemId) {
      const ids = {
        projectId: projectId,
        itemId: projectItemId
      };
      const request = opportunity ? this.projectItemService.findOpportunity(projectItemId) : this.projectItemService.findByProjectIdAndItemId(ids);
      request.pipe(takeUntil(this.subject$)).subscribe(projectItem => {
        this.projectItem = projectItem;
      });
    }
  }

  ngOnDestroy(): void {
    this.projectItemService.clearProjectItem();
    this.subject$.next(null);
    this.subject$.complete();
  }
}
