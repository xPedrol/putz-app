import {IState} from './state.model';
import {ActivatedRoute, Router} from '@angular/router';
import {deleteAllUndefinedFields} from "../../core/utils/deleteField";

export class TableBase {
  state: IState | undefined;
  listTotalSize: number;
  public router: Router;
  public activatedRoute: ActivatedRoute;

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.listTotalSize = 0;
  }

  pageChange(event: number): void {
    if (this.state) {
      this.state!.page = event;
      const m = (this.state.page - 1) * this.state.size;
      if (m >= 0 && m <= this.listTotalSize) {
        this.handleNavigation(this.state?.getQuery);
      }
    }
  }

  sizeChange(event: number): void {
    if (this.state) {
      this.state.size = event;
      // const m = this.state.page * this.state.size;
      // if (m >= 0 && m < this.listTotalSize) {
      this.handleNavigation(this.state.getQuery);
      // }
    }
  }

  onSort(event: any) {
    this.state!.sort = event;
    this.handleNavigation(this.state?.getQuery);
  }

  handleNavigation(params: any = null): void {
    params = deleteAllUndefinedFields(params);
    this.router.navigate([], {
      queryParams: params,
      relativeTo: this.activatedRoute,
      queryParamsHandling: ''
    });
  }
}
