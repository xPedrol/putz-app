import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  transform(value: any, callbackType: 'boolean' | 'string' | 'number' = 'string', prefix: string | null = null, suffix: string | null = null): any {
    if (callbackType === 'boolean') {
      if (Array.isArray(value)) {
        if (value && value?.length > 0) {
          return true;
        }
      }
      if (!Array.isArray(value)) {
        return !!value;
      }
    } else {
      if (!Array.isArray(value)) {
        if (value) {
          if (Number(value) && (!callbackType || callbackType === 'string')) {
            value = value.toString();
          } else if (Number(value)) {
            value = Number(value);
          }
          if (prefix) {
            value = `${prefix}${value}`;
          }
          if (suffix) {
            value = `${value}${suffix}`;
          }
          return value;
        } else if (callbackType === 'number') {
          return 0;
        } else {
          return '---';
        }
      }

    }
    return false;
  }

}
