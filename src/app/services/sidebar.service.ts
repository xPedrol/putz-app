import {Injectable} from '@angular/core';
import {NbSidebarService, NbSidebarState} from '@nebular/theme';
import {LayoutService} from '../core/utils/layout.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  state: NbSidebarState = 'collapsed';
  isSideBarCollapsed: BehaviorSubject<boolean>;

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
  ) {
    this.isSideBarCollapsed = new BehaviorSubject<boolean>(true);
  }

  toggleSidebar(compact: boolean = false, tag: string): void {
    this.sidebarService.toggle(compact, tag);
    this.layoutService.changeLayoutSize();
  }

  collapseSidebar(tag: string) {
    this.sidebarService.collapse(tag);
  }

  changed(event: NbSidebarState): void {
    this.state = event;
    switch (event) {
      case 'collapsed':
        this.isSideBarCollapsed.next(true);
        break;
      default:
        this.isSideBarCollapsed.next(false);
        break;
    }
  }
}
