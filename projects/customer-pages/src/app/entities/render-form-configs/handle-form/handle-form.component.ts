import {AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, of, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {RenderBaseFormComponent} from '../../render-forms/render-base-form/render-base-form.component';

@Component({
  selector: 'app-handle-form',
  templateUrl: './handle-form.component.html',
  styleUrls: ['./handle-form.component.scss']
})
export class HandleFormComponent implements OnInit, AfterViewInit, OnDestroy {
  subject$ = new Subject();
  @ViewChildren('cmp') components: QueryList<RenderBaseFormComponent> | undefined;
  renderSlug: string | null = null;
  currentForm: RenderBaseFormComponent | undefined;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getParams();
  }

  getParams(): void {
    combineLatest([
      this.activatedRoute?.params,
      this.activatedRoute.parent?.params ?? of(null)
    ]).pipe(takeUntil(this.subject$)).subscribe(([params, parentParams]) => {
      const currentParams = !params || Object.keys(params).length === 0 ? parentParams : params;
      this.renderSlug = currentParams?.renderSlug;
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  ngAfterViewInit(): void {
    const components: any[] | undefined = this.components?.toArray();
    if (components && components[0]) {
      this.currentForm = components[0];
    }
  }
}
