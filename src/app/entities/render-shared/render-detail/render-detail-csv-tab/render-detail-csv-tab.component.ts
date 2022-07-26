import {Component, OnInit} from '@angular/core';
import {ProjectRenderService} from '../../../../services/project-render.service';

@Component({
  selector: 'app-render-detail-csv-tab',
  templateUrl: './render-detail-csv-tab.component.html',
  styleUrls: ['./render-detail-csv-tab.component.scss']
})
export class RenderDetailCsvTabComponent implements OnInit {
  isCsvRenderProject: boolean = false;

  constructor(
    private projectRenderService: ProjectRenderService
  ) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    this.projectRenderService.projectRender$.subscribe(projectRender => {
      if (projectRender?.isCsvRenderProject) {
        this.isCsvRenderProject = true;
      }
    });
  }

}
