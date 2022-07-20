import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ProjectContractUploadFormComponent
} from '../../forms/project-contract-upload-form/project-contract-upload-form.component';
import {ProjectService} from '../../../../services/project.service';
import {IProject} from '../../../../models/project.model';
import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {ProjectStatus} from '../../../../models/enums/project-status.model';
import {AccountService} from '../../../../services/account.service';
import {Authority} from '../../../../constants/authority.constants';

@Component({
  selector: 'app-project-contract-tab',
  templateUrl: './project-contract-tab.component.html',
  styleUrls: ['./project-contract-tab.component.scss']
})
export class ProjectContractTabComponent implements OnInit {
  @ViewChild('projectContractUploadForm', {static: false}) projectContractUploadForm: ProjectContractUploadFormComponent;
  project: IProject | undefined;
  subject$ = new Subject();
  projectStatus = ProjectStatus;
  canEdit = false;

  constructor(
    private projectService: ProjectService,
    private toastService: NbToastrService,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    combineLatest([
      this.projectService.project$,
      this.accountService.accountSubject
    ]).pipe(takeUntil(this.subject$)).subscribe(([project, account]) => {
      if (project && this.project !== project) {
        this.project = project;
      }
      if (project && account) {
        if (account.notHasAnyAuthority([Authority.ADMIN])) {
          this.canEdit = project.canEdit;
        }else {
          this.canEdit = true;
        }
      }
    });
  }

  handleContractUploadForm(): void {
    const contract: File = this.projectContractUploadForm.validateAndGetRaw();
    if (contract) {
      this.saveContractUploadForm(contract);
    }
  }

  saveContractUploadForm(contract: File): void {
    if (contract && this.project) {
      this.projectService.uploadContract(this.project.id, contract).subscribe({
        next: (project) => {
          this.projectContractUploadForm.onRemove();
          this.project.agreementPdfLink = project?.agreementPdfLink;
          this.projectService.setProject(this.project);
          this.toastService.show('', `Contrato do projeto ${this.project?.name} enviado com sucesso`, {status: 'success'});
        }
      });
    }
  }
}
