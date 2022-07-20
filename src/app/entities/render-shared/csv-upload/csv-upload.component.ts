import {Component, OnInit} from '@angular/core';
import {renderFields} from '../../../constants/render-form-filed-names.constants';
import {takeUntil} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {Papa} from 'ngx-papaparse';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectRenderItemService} from '../../../services/project-render-item.service';
import {ProjectService} from '../../../services/project.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AccountService} from '../../../services/account.service';
import {NbAccessChecker} from '@nebular/security';
import {combineLatest, Subject} from 'rxjs';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {
  verifiedByClient = false;
  verifiedByClientMsg = false;
  isLoadingCSV = false;
  csvConfig = {
    delimiter: ';',
    ignoreHeader: false
  };
  csvError: string | undefined;
  file: FormControl;
  csvTotalLines: number | undefined;
  csvPreview: any | undefined;
  csvOptions = {
    header: false
  };
  csvWithField: {
    csv: string,
    putz: string,
    hasDiff: boolean
  }[] | undefined;
  fields: string[] | undefined;
  renderSlug: string;
  subject$ = new Subject();

  constructor(private papa: Papa,
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
      this.activatedRoute.parent?.params,
      this.activatedRoute.queryParams
    ]).subscribe(([params, parentParams, queryParams]) => {
      this.renderSlug = parentParams['renderSlug'];
    });
  }

  onSubmit() {
    this.onSubmitWithFile();

  }

  changeCSVConfigIgnoreHeader(): void {
    this.csvConfig.ignoreHeader = !this.csvConfig.ignoreHeader;
    if (this.file.value) {
      this.onSelect({addedFiles: [this.file.value]});
    }
  }

  onSelect(event: any) {
    const splittedName = String(event.addedFiles[0]?.name).split('.');
    const extension = splittedName[splittedName.length - 1];
    const acceptableExtensions: string[] = ['csv', 'txt'];
    if (event && acceptableExtensions.includes(extension.toLowerCase())) {
      if (this.file.value !== event.addedFiles[0]) {
        this.file.setValue(event.addedFiles[0]);
      }
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
      fileReader.readAsText(this.file.value, 'utf8');
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

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }
}
