import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'convert'
})
export class ConvertPipe implements PipeTransform {

  transform(value: any, newType: string = 'string'): string | null {
    if (moment.isMoment(value)) {
      return value.toISOString();
    } else if(value) {
      return value!.toString();
    }
    return null;
  }

}
