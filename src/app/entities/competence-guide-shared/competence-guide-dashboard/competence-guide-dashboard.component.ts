import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
  CompetenceGuideService,
  queryType as queryCompetenceGuideType
} from '../../../services/competence-guide.service';
import {CompetenceService, queryType as queryCompetenceType} from '../../../services/competence.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {ICompetence} from '../../../models/competence.model';
import {NbTagComponent, NbTagInputAddEvent} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {State} from '../../../models/table/state.model';
import {TableBase} from '../../../models/table/table-base.model';
import {takeUntil} from 'rxjs/operators';
import {ITag} from '../../../models/tag.model';

@Component({
  selector: 'app-competence-guide-dashboard',
  templateUrl: './competence-guide-dashboard.component.html',
  styleUrls: ['./competence-guide-dashboard.component.scss']
})
export class CompetenceGuideDashboardComponent extends TableBase implements OnInit {
  defaultListSize = 15;
  inputFormControl: FormControl;
  competences: ICompetence[] | undefined;
  competenceId: string | undefined;
  tags: Set<string> = new Set([]);
  filteredCompetences: ICompetence[] | undefined;
  loadingCGuide = false;
  subject: Subject<any>;
  @ViewChild('competenceGuideList', {static: true}) competenceGuideList: any;
  @ViewChild('autoInput', {static: false}) input: any;

  constructor(
    public competenceGuideService: CompetenceGuideService,
    private competenceService: CompetenceService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(router, activatedRoute);
    this.subject = new Subject<any>();
    this.inputFormControl = new FormControl();
  }

  ngOnInit() {
    this.getParams();
    this.competenceGuideService.totalCount$.pipe(takeUntil(this.subject)).subscribe(total => {
      this.listTotalSize = total ?? 0;
    });

  }

  getParams(): void {
    combineLatest([
      this.activatedRoute.paramMap,
      this.activatedRoute.queryParams
    ]).pipe(takeUntil(this.subject)).subscribe(([params, queryParams]) => {
      this.createState(queryParams);
      const competenceId = params.get('competenceId');
      if (competenceId) {
        this.competenceId = competenceId;
      } else {
        this.getCompetences();
      }
      this.getCompetenceGuides();
    });
  }

  createState(params: any = null): void {
    if (params) {
      this.state = new State(params);
      this.state.convertSortParams(params?.sort);
      if (params?.competenceList) {
        let competenceList = params?.competenceList;
        if (!Array.isArray(competenceList)) {
          competenceList = [competenceList];
        }
        this.state.searchTerm = {competenceList};
      }
    } else {
      this.state = new State({page: 1, size: this.defaultListSize});
    }
    this.defaultListSize = this.state?.size;
  }

  getCompetenceGuides(query: any = null): void {
    this.loadingCGuide = true;
    const competenceList = this.state?.searchTerm?.competenceList ?? [];
    // this.state!.searchTerm = undefined;
    if (!query) {
      query = this.state?.getQuery;
    }
    query.competenceList = undefined;
    query.page--;
    if (this.competenceId) {
      competenceList.push(this.competenceId);
    }
    this.competenceGuideHandle(this.competenceGuideService.query(query, competenceList));
  }

  getCompetences(): void {
    this.competenceHandle(this.competenceService.query());
  }

  competenceHandle(observable: Observable<queryCompetenceType>): void {
    observable.subscribe({
      next: ({competences}) => {
        this.competences = competences || [];
        this.filteredCompetences = this.competences;
        this.tags = new Set(this.getCompetenceNameList());
      },
      error: () => {
        this.competences = [];
      }
    });
  }

  competenceGuideHandle(observable: Observable<queryCompetenceGuideType>): void {
    observable.subscribe().add(() => this.loadingCGuide = false);
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
    this.filteredCompetences = this.competences;
    this.state!.searchTerm = {competenceList: this.getCompetenceIdList()};
    this.handleNavigation(this.state?.getQuery);
    //   this.getCompetenceGuides({
    //     ...this.competenceGuideList.state?.getQuery
    //   }, this.getCompetenceIdList());
  }

  onTagAdd({value, input}: NbTagInputAddEvent): void {
    if (value && !this.tags.has(value)) {
      this.tags.add(value);
    }
    input.nativeElement.value = '';
    this.state!.searchTerm = {competenceList: this.getCompetenceIdList()};
    // this.getCompetenceGuides({
    //   ...this.competenceGuideList.state?.getQuery
    // });
    this.handleNavigation(this.state?.getQuery);
  }


  onChange() {
    this.filteredCompetences = this.filter(this.input.nativeElement.value);
  }

  onSelectionChange($event: any) {
    this.onTagAdd({value: $event, input: this.input});
  }

  getCompetenceByName(competenceName: string): ICompetence | undefined {
    if (this.competences && this.competences?.length > 0) {
      for (let competence of this.competences) {
        if (competence?.name?.toLowerCase() === competenceName.toLowerCase()) {
          return competence;
        }
      }
    }
    return undefined;
  }

  getCompetenceIdList(): string[] {
    const competenceIds: string[] = [];
    this.tags.forEach(tag => {
      const competence = this.getCompetenceByName(tag);
      if (competence && competence.id) {
        competenceIds.push(String(competence.id));
      }
    });
    return competenceIds;
  }

  getCompetenceNameList(): string[] | null {
    const competenceNames: string[] = [];
    const competenceIds: string[] = this.state?.searchTerm?.competenceList;
    if (this.competences && competenceIds) {
      this.competences?.forEach(competence => {
        const exist = competenceIds.some(id => {
          return id === String(competence.id);
        });
        if (exist) {
          competenceNames.push(competence?.name ?? '');
        }
      });
      return competenceNames;
    }
    return null;
  }

  private filter(value: string): ICompetence[] {
    if (this.competences) {
      return this.competences?.filter(competence => {
        return competence?.name?.toLowerCase().includes(value);
      });
    }
    return [];
  }

  trackTagsByFn(index: number, item: ITag) {
    return item.id;
  }
}
