import {Component, ContentChild, Input, OnDestroy, OnInit} from '@angular/core';

import {combineLatest, Subject} from 'rxjs';
import {Papa} from 'ngx-papaparse';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectRenderItemService} from '../../../../../../../src/app/services/project-render-item.service';
import {ProjectService} from '../../../../../../../src/app/services/project.service';
import {AccountService} from '../../../../../../../src/app/services/account.service';
import {IProject} from '../../../../../../../src/app/models/project.model';
import {takeUntil} from 'rxjs/operators';
import {ToastService} from '../../../services/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NoProjectIdDialogComponent} from '../no-project-id-dialog/no-project-id-dialog.component';
import {RenderBaseFormComponent} from '../render-base-form/render-base-form.component';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-render-form-wrapper',
  templateUrl: './render-form-wrapper.component.html',
  styleUrls: ['./render-form-wrapper.component.scss']
})
export class RenderFormWrapperComponent implements OnInit, OnDestroy {
  @Input() showExampleButton = true;
  @Input() showHelpButton = true;
  @Input() showCsvButton = false;
  @ContentChild('form', {static: false}) form: RenderBaseFormComponent;
  isLoadingForm = false;
  subject$ = new Subject();
  renderSlug: string | undefined;
  projectRenderId: number | undefined;
  isPrecadastro = false;
  isFeedback = false;

  constructor(
    private papa: Papa,
    private activatedRoute: ActivatedRoute,
    private renderItemService: ProjectRenderItemService,
    private projectService: ProjectService,
    private accountService: AccountService,
    private router: Router,
    public toastService: ToastService,
    private modalService: NgbModal,
    private viewportScroller: ViewportScroller,
  ) {
  }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.parent?.url,
      this.activatedRoute.queryParams
    ]).subscribe((res) => {
      this.isFeedback = false;
      const [params, url, queryParams] = res as any;
      if (url) {
        this.renderSlug = url[0].path;
      }
      if (params && Object.keys(params).length > 0) {
        const {renderId, renderItemId} = params;
        if (renderId && renderItemId) {
          this.isFeedback = true;
        }
      }
      if (queryParams && Object.keys(queryParams).length > 0) {
        const {renderId} = queryParams;
        if (renderId) {
          this.projectRenderId = renderId;
          this.isFeedback = true;
          this.projectService.setProject({projectRenderId: this.projectRenderId} as IProject);
        }
      }
    });
    this.accountService.accountSubject.subscribe(account => {
      this.isPrecadastro = !account;
    });
  }


  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  onSubmitWithForm(): void {
    if (this.form) {
      this.form.uploadForm.markAllAsTouched();
      if (this.form.uploadForm.invalid) {
        return;
      }
      const sendForm = (forcePreCadastro: boolean = false) => {
        this.isLoadingForm = true;
        this.onClick('render-video');
        this.form.onSubmit(this.projectRenderId, forcePreCadastro || this.isPrecadastro).pipe(takeUntil(this.subject$)).subscribe({
          next: (value) => {
            const renderItemId = value?.id;
            if (renderItemId) {
              this.router.navigate([], {
                queryParams: {
                  renderId: value?.renderProject?.id,
                  renderItemId
                },
                relativeTo: this.activatedRoute,
                queryParamsHandling: ''
              });
            }
          },
          error: () => {
            this.toastService.show({title: '', description: ''}, {classname: 'bg-danger text-light'});
          }
        }).add(() => this.isLoadingForm = false);
      };
      if (!this.isPrecadastro && !this.projectRenderId) {
        this.modalService.open(NoProjectIdDialogComponent, {
          ariaLabelledBy: 'modal-basic-title',
          centered: true
        }).result.then((proceed) => {
          if (proceed) {
            sendForm(true);
          }
        }, () => {

        });
      } else {
        sendForm();
      }

    }
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  getAccount(): void {
    this.accountService.getAccount();
  }
}
