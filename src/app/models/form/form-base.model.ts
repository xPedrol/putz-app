import {FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

export function handleFormErrors(form: FormGroup, res: HttpErrorResponse): void {
  const fields: any[] = res?.error?.fieldErrors;
  if (fields && fields?.length > 0) {
    fields.forEach(err => {
      const field = form.get(err.field);
      if (field) {
        field.setErrors({apiValidation: err?.message ?? 'Campo inválido'});
      }
    });
  }
}
