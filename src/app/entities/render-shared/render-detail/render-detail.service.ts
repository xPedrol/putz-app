import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RenderDetailService {
  renderDetailData$: BehaviorSubject<string>

  constructor() {
    this.renderDetailData$ = new BehaviorSubject<string >(null);
  }
}
