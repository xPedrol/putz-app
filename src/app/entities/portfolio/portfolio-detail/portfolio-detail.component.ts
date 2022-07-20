import {Component, OnDestroy, OnInit} from '@angular/core';
import {PortfolioService} from '../../../services/portfolio.service';
import {IPortfolio, Portfolio} from '../../../models/portfolio.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../services/account.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICompetenceGuide} from '../../../models/competence-guide.model';
import {CompetenceGuideService} from '../../../services/competence-guide.service';
import {catchError, debounceTime, mergeMap, takeUntil} from 'rxjs/operators';
import {NbDialogService, NbTagComponent, NbToastrService} from '@nebular/theme';
import {combineLatest, EMPTY, Observable, Subject} from 'rxjs';
import {ITag} from '../../../models/tag.model';
import {queryType, TagService} from '../../../services/tag.service';
import {HeadService} from '../../../services/head.service';
import {FileSizeWarningComponent} from '../../../shared/components/file-size-warning/file-size-warning.component';
import {PortfolioRequestStatusEnumArray} from '../../../models/enums/portfolio-request-status.model';

@Component({
  selector: 'app-portfolio-manager-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: [
    './portfolio-detail.component.css',
    '../../../shared/themes/dropzone.scss',
    '../../../shared/themes/nebular-overrides.scss'
  ]
})
export class PortfolioDetailComponent implements OnInit, OnDestroy {
  maxFileSize = 50000000;
  subject$ = new Subject();
  competenceGuides: ICompetenceGuide[] | undefined;
  competenceGuide: ICompetenceGuide | undefined;
  competenceGuideId: number | undefined;
  portfolio: IPortfolio | undefined;
  portfolioRequestStatusEnumArray = PortfolioRequestStatusEnumArray;
  portfolioId: number | undefined;
  editForm: FormGroup;
  fileType: 'file' | 'link' = 'link';
  competenceGuideInput: FormControl;
  tagInput: FormControl;
  loadingPortfolioUpdate = false;
  tags: ITag[] | undefined;
  selectedTags: Set<ITag> = new Set([]);

  constructor(
    private portfolioService: PortfolioService,
    private competenceGuideService: CompetenceGuideService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private toastService: NbToastrService,
    private router: Router,
    private tagService: TagService,
    private headService: HeadService,
    private dialogService: NbDialogService
  ) {
    this.editForm = new FormGroup({
      id: new FormControl(null),
      description: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [this.requiredValidation]),
      fileLink: new FormControl(null, [this.requiredValidation, Validators.minLength(3)]),
      competence: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]),
      person: new FormControl(null, [Validators.required]),
      requestStatus: new FormControl(null, [Validators.required]),
    });
    this.competenceGuideInput = new FormControl();
    this.tagInput = new FormControl();
  }

  ngOnInit(): void {
    this.getParams();
    this.competenceGuideInput.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe((value) => {
      this.onSelectionChange(value);
      this.getCompetenceGuides({size: 10, page: 1, search: value ?? ''});
    });
    this.tagInput.valueChanges.pipe(debounceTime(500), takeUntil(this.subject$)).subscribe((value: any) => {
      if (typeof value === 'string') {
        this.getTags({size: 10, page: 1, search: value ?? ''});
      }
    });
  }

  getParams(): void {
    combineLatest(
      [
        this.activatedRoute.queryParams,
        this.activatedRoute.params
      ]
    ).pipe(takeUntil(this.subject$)).subscribe((allParams) => {
      this.competenceGuideId = allParams[0]!.competenceGuide;
      this.portfolioId = allParams[1]!.portfolioId !== 'new' ? allParams[1]!.portfolioId : undefined;
      this.getPortfolio();
      this.getCompetenceGuides();
      this.getTags();
    });
  }

  getPortfolio(): void {
    if (this.portfolioId && this.accountService?.account?.login) {
      this.portfolioService.findByPerson(this.accountService.account.login, this.portfolioId).pipe(takeUntil(this.subject$)).subscribe(portfolio => {
        this.portfolio = portfolio;
        this.headService.setTitle(`${this.portfolio?.name}`);
        this.getCompetenceGuide();
      });
    } else {
      this.getCompetenceGuide();
    }
  }

  getCompetenceGuide(): void {
    if (this.competenceGuideId) {
      this.competenceGuideService.find(this.competenceGuideId).pipe(takeUntil(this.subject$)).subscribe(cGuide => {
        this.competenceGuide = cGuide;
        if (!this.portfolio) {
          this.portfolio = new Portfolio();
        }
        this.portfolio.competence = this.competenceGuide.competence;
        this.portfolio.level = this.competenceGuide.level;
        this.updateForm();
      });
    } else {
      this.updateForm();
    }
  }

  getCompetenceGuides(query: any = null): void {
    if (!query) {
      query = {size: 10, page: 1};
    }
    query.page--;
    this.competenceGuideService.query(query).pipe(takeUntil(this.subject$)).subscribe(req => {
      this.competenceGuides = req.competenceGuides;
    });
  }

  updateForm(): void {
    this.editForm.get('id')?.setValue(this.portfolio?.id);
    this.editForm.get('requestStatus')?.setValue(this.portfolio?.requestStatus);
    this.editForm.get('description')?.setValue(this.portfolio?.description);
    this.editForm.get('file')?.setValue(this.portfolio?.file);
    this.editForm.get('fileLink')?.setValue(this.portfolio?.fileLink);
    this.editForm.get('competence')?.setValue(this.portfolio?.competence);
    this.editForm.get('person')?.setValue({id: (this.portfolio?.person?.id ?? this.accountService.account?.id)});
    this.editForm.get('level')?.setValue(this.portfolio?.level ?? null);
    this.selectedTags = this.arrayToSet();
  }

  SetToArray(): ITag[] {
    const tags: ITag[] = [];
    this.selectedTags.forEach(tag => {
      tags.push(tag);
    });
    return tags;
  }

  arrayToSet(): Set<ITag> {
    const tags: Set<ITag> = new Set([]);
    if (this.portfolio && this.portfolio?.tags) {
      this.portfolio.tags.forEach(tag => {
        tags.add(tag);
      });
    }
    return tags;
  }

  save(): void {
    this.editForm.get('fileLink')?.updateValueAndValidity();
    this.editForm.get('file')?.updateValueAndValidity();
    const portfolio: IPortfolio = this.editForm.getRawValue();
    portfolio.tags = this.SetToArray();
    // @ts-ignore
    const file: File = portfolio.file;
    portfolio.file = undefined;
    const login = this.accountService.account?.login ?? '';
    portfolio.name = `${portfolio.competence?.name} ${portfolio.level}`;
    if (this.editForm.valid && file) {
      this.loadingPortfolioUpdate = true;
      this.handleObservable(this.portfolioService.fileUpload(file).pipe(mergeMap((fileLink) => {
        this.toastService.show('', 'Arquivo criado com sucesso', {status: 'success'});
        if (fileLink) {
          portfolio.fileLink = fileLink;
          return this.handlePortfolioRequest(login, portfolio);
        }
        return EMPTY;
      }), catchError(() => {
        return EMPTY;
      })));
    } else if (this.editForm.valid && this.editForm.get('fileLink')?.value) {
      this.handleObservable(this.handlePortfolioRequest(login, portfolio));
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  handlePortfolioRequest(login: string, portfolio: IPortfolio): Observable<IPortfolio> {
    if (portfolio?.id) {
      return this.portfolioService.updateByFreelancer(login, portfolio);
    } else {
      return this.portfolioService.createByFreelancer(login, portfolio);
    }
  }

  handleObservable(observable: Observable<IPortfolio>): void {
    if (observable !== EMPTY) {
      observable.pipe(takeUntil(this.subject$)).subscribe({
        next: (portfolio) => {
          this.loadingPortfolioUpdate = true;
          if (portfolio) {
            this.toastService.show('', 'Portfolio salvo com sucesso', {status: 'success'});
            if (!this.portfolioId) {
              this.router.navigateByUrl(`/portfolios/${portfolio.id}`);
            }
          }

        }
      }).add(() => this.loadingPortfolioUpdate = false);
    } else {
      this.loadingPortfolioUpdate = false;
    }
  }

  onSelect(event: any) {
    if ((event.addedFiles[0] as File).size > this.maxFileSize) {
      this.dialogService.open(FileSizeWarningComponent, {
        context: {
          file: event.addedFiles[0],
          maxFileSize: this.maxFileSize
        }
      });
    } else {
      this.editForm.get('file')?.setValue(event.addedFiles[0]);
    }
    // this.file = event.addedFiles[0];
  }

  onRemove() {
    this.editForm.get('file')?.setValue(null);
    // this.file = null;
  }

  changeFileType(): void {
    if (this.fileType === 'file') {
      this.fileType = 'link';
      this.editForm.get('file')?.setValue(null);
    } else {
      this.fileType = 'file';
      this.editForm.get('fileLink')?.setValue(null);
    }
  }

  viewHandle(value: string, selected = false): any {
    if (selected) {
      value = 'aa';
    }
    return value;
  }

  onSelectionChange($event: any) {
    const competenceGuide = this.competenceGuideService.getByName($event, this.competenceGuides);
    this.updateFormWithCompetenceGuide(competenceGuide);
  }

  updateFormWithCompetenceGuide(competenceGuide: ICompetenceGuide | null): void {
    this.editForm.get('competence')?.setValue(competenceGuide?.competence ?? null);
    this.editForm.get('level')?.setValue(competenceGuide?.level ?? null);
  }

  requiredValidation = (): any => {
    if (this.editForm) {
      if (!this.editForm.get('file')?.value && !this.editForm.get('fileLink')?.value) {
        return {
          requiredValidation: true
        };
      }
    }
    return null;
  };

  getTags(query: any = null): void {
    if (!query) {
      query = {size: 10, page: 1};
    }
    query.page--;
    this.tagsHandle(this.tagService.query(query));
  }

  tagsHandle(observable: Observable<queryType>): void {
    observable.pipe(takeUntil(this.subject$)).subscribe(req => {
      this.tags = req.tags || [];
    });
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    const tag = this.findSelectedTagById(tagToRemove.role);
    if (tag) {
      this.selectedTags.delete(tag);
      this.getTags();
    }
  }

  onTagAdd(value: ITag, input: any): void {
    if (value && value?.id && !this.findSelectedTagById(value.id)) {
      this.selectedTags.add(value);
      this.getTags();
    }
    input.value = '';
  }

  findSelectedTagById(id: number | string): ITag | null {
    for (let tag of this.selectedTags) {
      if (Number(tag.id) === Number(id)) {
        return tag;
      }
    }
    return null;
  }

  trackCompetenceGuidesByFn(index: number, item: ICompetenceGuide): number {
    return item.id as number;
  }
  trackTagsByFn(index: number, item: ITag): number {
    return item.id as number;
  }

  ngOnDestroy(): void {
    this.portfolioService.clearPortfolio();
    this.competenceGuideService.clearCompetenceGuides();
    this.subject$.next(null);
    this.subject$.complete();
  }
}
