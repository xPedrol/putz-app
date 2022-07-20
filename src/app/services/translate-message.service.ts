import {Injectable, Injector} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {IErrorHandlerResponse} from "../models/ErrorHandlerResponse.model";
import {errorHandlerFallbackConstants} from "../constants/errorHandlerFallback.constants";
import {NbToastrService} from "@nebular/theme";

@Injectable({
  providedIn: 'root'
})
export class TranslateMessageService {

  constructor(
    private toastService: NbToastrService,
    private injector: Injector
  ) {
  }


  convertAndShowToast(message?: string): void {
    if (message) {
      this.injector.get(TranslateService).get(message).subscribe((res: IErrorHandlerResponse) => {
        const title = res?.title;
        const description = res?.description;
        if (title || description) {
          this.toastService.show(description, title, {status: 'danger'});
        } else {
          this.showUndefinedToast();
        }
      });
    } else {
      this.showUndefinedToast();
    }
  }

  showUndefinedToast(): void {
    this.toastService.show(errorHandlerFallbackConstants.description, errorHandlerFallbackConstants.title, {status: 'danger'});
  }
}
