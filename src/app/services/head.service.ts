import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {headTitle} from '../constants/headTitle.constants';

@Injectable({
  providedIn: 'root'
})
export class HeadService {


  constructor(
    private titleService: Title
  ) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(`${headTitle} - ${newTitle}`);
  }
}
