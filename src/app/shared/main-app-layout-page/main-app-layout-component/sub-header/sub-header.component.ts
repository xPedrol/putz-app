import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import {MenuItemsService} from '../../../../core/utils/menu-items.service';
import {AccountService} from '../../../../services/account.service';
import {isPlatformBrowser} from '@angular/common';
import {GuidedTourService} from '../../../../../../projects/guided-tour/src/lib/guided-tour.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IAppMenu} from "../../../../models/app-menu.model";
import {GuidedTour, TourStep} from "../../../../../../projects/guided-tour/src/lib/guided-tour.constants";


@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubHeaderComponent implements OnInit, OnDestroy {
  headerItems: IAppMenu[];
  isBrowser: boolean;
  canShowGuidedTour = true;
  private subject$: Subject<any>;

  constructor(
    private menuItemsService: MenuItemsService,
    public accountService: AccountService,
    @Inject(PLATFORM_ID) platformId: string,
    private guidedTourService: GuidedTourService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subject$ = new Subject<any>();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.menuItemsService.currentMenu$.pipe(takeUntil(this.subject$)).subscribe(items => {
      // console.warn('items ', items);
      if (items && items.length > 0) {
        this.headerItems = items;
      }
    }).add(() => this.changeDetectorRef.detectChanges());
  }


  buildGuidedTour(): void {
    if (this.isBrowser && this.headerItems && this.headerItems.length > 0) {
      this.canShowGuidedTour = true;
      const guidedTour: GuidedTour = {
        tourId: 'sub-header',
        steps: this.headerItems.map((item: IAppMenu) => {
          return {
            selector: `.item-${item.name}`,
            title: item.title,
            content: item.description ?? 'Sem descrição',
            orientation: 'bottom',
            skipStep: item.hidden
          } as TourStep;
        }) as TourStep[]
      };
      this.guidedTourService.startTour(guidedTour);
    }
  }

  trackBySubHeaderItems(index: number, item: any) {
    return item.name;
  }

  ngOnDestroy() {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
