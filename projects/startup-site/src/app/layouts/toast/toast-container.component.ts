import {Component} from '@angular/core';
import {ToastService} from "../../services/toast.service";


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast [class]="toast.classname"
               [autohide]="true"
               [delay]="toast.delay || 5000"
               (hidden)="toastService.remove(toast)" *ngFor="let toast of toastService.toasts">
      <ng-template ngbToastHeader>
        <div class="me-auto">
          <strong class="mx-1">{{toast.data.title}}</strong>
        </div>

      </ng-template>
      {{toast.data.description}}
    </ngb-toast>
  `,
  host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {
  }

  // isTemplate(toast) {
  //   return toast.textOrTpl instanceof TemplateRef;
  // }
}
