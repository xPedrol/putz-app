import {AfterContentInit, Component, ContentChild, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {Subject} from 'rxjs';
import {Papa} from 'ngx-papaparse';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectRenderItemService} from '../../../../../../src/app/services/project-render-item.service';
import {ProjectService} from '../../../../../../src/app/services/project.service';
import {renderFields} from '../../../../../../src/app/constants/render-form-filed-names.constants';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {HttpErrorResponse} from '@angular/common/http';
import {RenderBaseFormComponent} from '../render-forms/render-base-form/render-base-form.component';
import {AccountService} from '../../../../../../src/app/services/account.service';
import {NbAccessChecker} from '@nebular/security';
import {NoProjectIdDialogComponent} from "./no-project-id-dialog/no-project-id-dialog.component";
import {IProject} from "../../../../../../src/app/models/project.model";

@Component({
  selector: 'app-render-wrapper',
  templateUrl: './render-form-wrapper.component.html',
  styleUrls: [
    './render-form-wrapper.component.scss',

  ]
})
export class RenderFormWrapperComponent implements OnInit, AfterContentInit, OnDestroy {
  // @ts-ignore
  @ContentChild('form', {static: false}) form: RenderBaseFormComponent;
  verifiedByClient = false;
  verifiedByClientMsg = false;
  isLoadingForm = false;
  isLoadingCSV = false;
  uploadCsv = false;
  csvTotalLines: number | undefined;
  csvPreview: any | undefined;
  csvWithField: {
    csv: string,
    putz: string,
    hasDiff: boolean
  }[] | undefined;
  csvConfig = {
    delimiter: ';',
    ignoreHeader: false
  };
  subject$ = new Subject();
  file: FormControl;
  renderSlug: string | undefined;
  projectRenderId: number | undefined;
  csvOptions = {
    header: false
  };
  fields: string[] | undefined;
  csvError: string | undefined;
  isPrecadastro = false;
  isFeedback = false;
  canAccessCsvView = false;

  constructor(
    private papa: Papa,
    private activatedRoute: ActivatedRoute,
    private renderItemService: ProjectRenderItemService,
    private projectService: ProjectService,
    private toastService: NbToastrService,
    private accountService: AccountService,
    private router: Router,
    private accessChecker: NbAccessChecker,
    private dialogService: NbDialogService
  ) {
    this.file = new FormControl();
  }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params,
      this.activatedRoute.parent?.url,
      this.activatedRoute.queryParams
    ]).subscribe((res) => {
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
        const {projectRenderId} = queryParams;
        if (projectRenderId) {
          this.projectRenderId = projectRenderId;
          this.projectService.setProject({projectRenderId: this.projectRenderId} as IProject);
        }
      }
    });

    this.accountService.accountSubject.subscribe(account => {
      this.isPrecadastro = !account;
    });
    this.accessChecker.isGranted('view', 'render-csv-view').pipe().subscribe(hasAccess => {
      this.canAccessCsvView = hasAccess;
    });
  }

  onSubmit() {
    if (this.uploadCsv && this.canAccessCsvView) {
      this.onSubmitWithFile();
    } else if (!this.uploadCsv) {
      this.onSubmitWithForm();
    }
  }

  onSubmitWithForm(): void {
    if (this.form) {
      this.form.uploadForm.markAllAsTouched();
      if (this.form.uploadForm.invalid) {
        return;
      }
      const sendForm = (forcePreCadastro: boolean = false) => {
        this.isLoadingForm = true;
        this.form.onSubmit(this.projectRenderId, forcePreCadastro || this.isPrecadastro).pipe(takeUntil(this.subject$)).subscribe((value) => {
          const renderItemId = value?.id;
          if (renderItemId) {
            this.router.navigate(['', 'feedback'], {
              queryParams: {
                renderId: value?.renderProject?.id,
                renderItemId
              }
            });
          }
        }).add(() => this.isLoadingForm = false);
      };
      if (!this.isPrecadastro && !this.projectRenderId) {
        this.dialogService.open(NoProjectIdDialogComponent).onClose.subscribe(proceed => {
          if (proceed) {
            sendForm(true);
          }
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

  onSelect(event: any) {
    const splittedName = String(event.addedFiles[0]?.name).split('.');
    const extension = splittedName[splittedName.length - 1];
    const acceptableExtensions: string[] = ['csv', 'txt'];
    if (event && acceptableExtensions.includes(extension.toLowerCase())) {
      this.file.setValue(event.addedFiles[0]);
      let fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const papaResult = this.papa.parse(fileReader.result as string, this.csvOptions);
        this.csvConfig.delimiter = papaResult.meta.delimiter;
        let fieldsArray = papaResult.data;
        this.csvTotalLines = fieldsArray?.length ?? 0;
        this.csvPreview = {
          headerLine: this.csvConfig.ignoreHeader ? fieldsArray[0] : [],
          firstDataLine: this.csvConfig.ignoreHeader ? fieldsArray[1] : fieldsArray[0]
        };
        if (this.renderSlug) {
          this.fields = renderFields[this.renderSlug];
        }
        if (this.fields) {
          const totalLine = ((this.fields?.length) > (this.csvPreview?.headerLine?.length)) ? this.fields?.length : this.csvPreview?.headerLine?.length;
          this.csvWithField = [];
          for (let i = 0; i < totalLine; i++) {
            const csv = this.csvPreview?.headerLine[i] ?? '---';
            const putz = this.fields[i] ?? '---';
            const obj = {csv, putz, hasDiff: this.hasDiff(csv, putz)};
            this.csvWithField.push(obj);
          }
        } else {
          this.toastService.show('', `Os campos padrões do csv não foram configurados pela Putz Filmes`, {status: 'warning'});
        }
      };
      fileReader.readAsText(this.file.value, 'ISO-8859-1');
    }
  }

  onRemove() {
    this.file.reset();
    this.csvWithField = undefined;
    this.fields = undefined;
    this.csvPreview = undefined;
    this.csvTotalLines = 0;
  }

  onSubmitWithFile(): void {
    const renderSlug = this.renderSlug;
    if (renderSlug && this.file.value) {
      if (!this.verifiedByClient) {
        this.verifiedByClientMsg = true;
        return;
      }
      this.isLoadingCSV = true;
      // let fieldsArray = this.papa.parse(fileReader.result as string, this.csvOptions).data;
      this.renderItemService.uploadCsv(this.file.value, renderSlug, this.csvConfig).pipe(takeUntil(this.subject$)).subscribe({
        next: () => {
          this.toastService.show('', `Enviado com sucesso`, {status: 'success'});
          this.onRemove();
        },
        error: ((res: HttpErrorResponse) => {
          const errTitle = res.error?.['title'];
          if (errTitle) {
            this.csvError = errTitle;
          }
        })
      }).add(() => this.isLoadingCSV = false);
    }
  }

  hasDiff(csv: string, putz: string): any {
    const cleanFormat = (string: string) => {
      return string.toString().toLowerCase()
        .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       // Special Characters #1
        .replace(/[èÈéÉêÊëË]+/g, 'e')        // Special Characters #2
        .replace(/[ìÌíÍîÎïÏ]+/g, 'i')        // Special Characters #3
        .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')        // Special Characters #4
        .replace(/[ùÙúÚûÛüÜ]+/g, 'u')        // Special Characters #5
        .replace(/[ýÝÿŸ]+/g, 'y')          // Special Characters #6
        .replace(/[ñÑ]+/g, 'n')            // Special Characters #7
        .replace(/[çÇ]+/g, 'c')            // Special Characters #8
        .replace(/[ß]+/g, 'ss')            // Special Characters #9
        .replace(/[Ææ]+/g, 'ae')            // Special Characters #10
        .replace(/[Øøœ]+/g, 'oe')          // Special Characters #11
        .replace(/[%]+/g, 'pct')            // Special Characters #12
        .replace(/\s+/g, '')              // Replace spaces with -
        // .replace(/[^\w\-]+/g, '')          // Remove all non-word chars
        .replace(/\-\-+/g, '-')            // Replace multiple - with single -
        .replace(/^-+/, '')                // Trim - from start of text
        .replace(/-+$/, '');
    };
    return cleanFormat(csv) !== cleanFormat(putz);
  }

  ngAfterContentInit(): void {

  }

  getAccount(): void {
    this.accountService.getAccount();
  }

}
