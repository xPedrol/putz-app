import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {Subject} from 'rxjs';
import {ufs} from '../../../../../../../src/app/constants/ufs.constants';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {IProject} from '../../../../../../../src/app/models/project.model';
import {RenderBaseFormComponent} from '../render-base-form/render-base-form.component';

@Component({
  selector: 'app-render-form-teste',
  templateUrl: './render-form-teste.component.html',
  styleUrls: ['./render-form-teste.component.scss','../../../../../../../src/app/shared/themes/dropzone.scss']
})
export class RenderFormTesteComponent extends RenderBaseFormComponent implements OnInit {
  createFromForm() {
    return this.uploadForm.getRawValue();
  }

  formSlug = 'teste';
  uploadForm: FormGroup;
  subject$: Subject<any>;
  ufs = ufs;
  project: IProject | undefined;
  fileView = false;
  file: FormControl;

  constructor(
    public toastService: NbToastrService,
    public projectRenderItemService: ProjectRenderItemService,
    public projectService: ProjectService,
  ) {
    super(toastService, projectService, projectRenderItemService);
    this.file = new FormControl();
    this.subject$ = new Subject();
    this.uploadForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      subtitulo: new FormControl('', [Validators.required]),
      audio: new FormControl('', [Validators.required]),
      background: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.projectService.project$.subscribe(project => {
      this.project = project ?? undefined;
    });
  }

  autoComplete() {
    this.uploadForm.reset({
      titulo: 'titulo',
      subtitulo: 'subtitulo',
      audio: 'audio1.mp3',
      background: 'img1.jpg',
    });
  }

  onSelect(event: any) {
    const splittedName = String(event.addedFiles[0]?.name).split('.');
    const extension = splittedName[splittedName.length - 1];
    if (event && extension.toLowerCase() === 'csv') {
      this.file.setValue(event.addedFiles[0]);
    }
  }

  onRemove() {
    this.file.reset();
  }
}
