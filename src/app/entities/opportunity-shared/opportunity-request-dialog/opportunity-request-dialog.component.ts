import {Component, OnInit} from '@angular/core';
import {ProjectItemRequestService} from '../../../services/project-item-request.service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {FormControl, Validators} from '@angular/forms';
import {IProjectItem} from '../../../models/project-item.model';

@Component({
  selector: 'app-opportunity-request-dialog',
  templateUrl: './opportunity-request-dialog.component.html',
  styleUrls: ['./opportunity-request-dialog.component.scss']
})
export class OpportunityRequestDialogComponent implements OnInit {
  projectItem: IProjectItem | undefined;
  descriptionFormControl: FormControl;

  constructor(
    private projectItemRequestService: ProjectItemRequestService,
    private toastService: NbToastrService,
    private dialogRef: NbDialogRef<OpportunityRequestDialogComponent>
  ) {
    this.descriptionFormControl = new FormControl(null, [Validators.maxLength(512)]);
  }

  ngOnInit(): void {
  }

  requestOpportunity(): void {
    if ((this.projectItem && this.projectItem.id) && this.descriptionFormControl.value) {
      this.projectItemRequestService.createRequest(this.projectItem.id, this.descriptionFormControl.value).subscribe((request) => {
        if (request) {
          this.toastService.show('', 'Solicitação criada com sucesso', {status: 'success'});
          this.close();
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
