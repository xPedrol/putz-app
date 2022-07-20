/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Inject, NgZone, OnDestroy, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, publishReplay, refCount, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NB_WINDOW } from '@nebular/theme';
// import { NgdTabbedBlockComponent } from '../../blocks/components/tabbed-block/tabbed-block.component';
import { NgdStructureService } from '../../../../services/structure.service';

@Component({
  selector: 'ngd-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class NgdPageComponent implements OnInit, OnDestroy {

  currentItem;
  private destroy$ = new Subject<void>();

  currentTabName: string = '';

  constructor(@Inject(NB_WINDOW) private window,
              private ngZone: NgZone,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private structureService: NgdStructureService,
              private titleService: Title) {
  }

  get showSettings() {
    return this.currentItem && this.currentItem.children
      .some((item) => ['markdown', 'component', 'tabbed'].includes(item.block));
  }

  ngOnInit() {
    this.handlePageNavigation();
    this.window.history.scrollRestoration = 'manual';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handlePageNavigation() {
    this.activatedRoute.params
      .pipe(
        filter((params: any) => params.subPage),
        map((params: any) => {
          const slag = `${params.page}_${params.subPage}`;
          return this.structureService.findPageBySlag(this.structureService.getPreparedStructure(), slag);
        }),
        filter(item => item),
        tap((item: any) => {
          let title = `Putz Filmes - ${item.name}`;

          if (item.type === 'tabs') {
            title += ' Angular UI Component';
          }
          this.titleService.setTitle(title);
        }),
        publishReplay(),
        refCount(),
        takeUntil(this.destroy$),
      )
      .subscribe((item) => {
        this.currentItem = item;
      });
  }
}
