import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {NbToastrService} from '@nebular/theme';
import {environment} from '../../../environments/environment';
import {IErrorHandlerResponse} from "../../models/ErrorHandlerResponse.model";
import {errorHandlerFallbackConstants} from "../../constants/errorHandlerFallback.constants";


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  exceptions = ['account'];

  constructor(
    private toastService: NbToastrService,
    private injector: Injector,
  ) {
  }

  isExternal(url: string): boolean {
    return !url.includes(environment.API_URL);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMsg: IErrorHandlerResponse;
            let stop = this.exceptions.some((exception) => {
              const completeUrl = `${environment.API_URL}${exception}`;
              return completeUrl.indexOf(request.url) > -1;
            }) || request.headers.get('noToast');
            if (!stop && !this.isExternal(request.url)) {
              let message = error.error.message;
              switch (error.error.status) {
                case 404:
                  if (error.error.message?.includes('http') || error.error.message === 'No message available') {
                    message = 'error.http.404';
                  } else {
                    message = 'error.404';
                  }
                  break;
                case 401:
                  if (String(error.error?.detail).includes('was not activated')) {
                    message = 'error.notActivated';
                  }
                  break;
                case 500:
                  if (error.error?.detail && !message) {
                    message = error.error.detail;
                  }

                  break;
              }
              message = message ?? 'error.http.505';
              this.injector.get(TranslateService).get(message).subscribe((res: IErrorHandlerResponse) => {
                const title = res?.title;
                const description = res?.description;
                if (title || description) {
                  this.toastService.show(description, title, {status: 'danger'});
                } else {
                  this.toastService.show(errorHandlerFallbackConstants.description, errorHandlerFallbackConstants.title, {status: 'danger'});
                }
                errorMsg = res;
              });
            }
            return throwError(error);
          })
        );
    } else {
      return next.handle(request);
    }
  }
}
