import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Pipe({
  name: 'momentToDate'
})
export class MomentToDatePipe implements PipeTransform {

  transform(value: Moment | undefined, ...args: unknown[]): Date {
    if(moment.isMoment(value)){
      return value.toDate();
    }
    return moment().toDate();
  }

}
