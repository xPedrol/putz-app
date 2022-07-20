import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {State} from '../../../models/table/state.model';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {TableBase} from '../../../models/table/table-base.model';
import {IPerson} from '../../../models/person.model';
import {PersonService} from '../../../services/person.service';
import {levelArray} from '../../../models/enums/level.model';
import {deleteField} from '../../../core/utils/deleteField';
import {ICompetence} from "../../../models/competence.model";
import {CompetenceService} from "../../../services/competence.service";

@Component({
  selector: 'app-portfolio-filter-dialog',
  templateUrl: './portfolio-filter-dialog.component.html',
  styleUrls: ['./portfolio-filter-dialog.component.scss']
})
export class PortfolioFilterDialogComponent extends TableBase implements OnInit {
  filterForm: FormGroup;
  subject$: Subject<any>;
  people: IPerson[];
  competences: ICompetence[];
  portfolioLevelItems = levelArray;
  personParamName = 'personId.equals';
  competenceParamName = 'competenceId.equals';
  portfolioLevelParamName = 'level.equals';

  constructor(
    private dialogRef: NbDialogRef<PortfolioFilterDialogComponent>,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private personService: PersonService,
    private competenceService: CompetenceService
  ) {
    super(router, activatedRoute);
    this.subject$ = new Subject();
    this.filterForm = new FormGroup({
      personSearch: new FormControl(),
      portfolioLevel: new FormControl(),
      competenceSearch: new FormControl()
    });
  }

  ngOnInit(): void {
    this.state = new State(this.state, true);
    deleteField(this.state, 'sort');
    this.getPeople();
    this.getCompetences();
    if (this.state?.searchTerm[this.portfolioLevelParamName]) {
      this.filterForm.get('portfolioLevel').setValue(this.state.searchTerm[this.portfolioLevelParamName], {emitEvent: false});
    }

    this.filterForm.get('personSearch').valueChanges.pipe(takeUntil(this.subject$), debounceTime(500)).subscribe((value: IPerson | string) => {
      if (value) {
        if (typeof value === 'string') {
          this.getPeople();
        } else {
          value = value as IPerson;
          if (value?.id) {
            this.state.searchTerm[this.personParamName] = value.id;
          }
        }
      } else {
        if (this.state?.searchTerm[this.personParamName]) {
          deleteField(this.state.searchTerm, this.personParamName);
        }
      }
    });
    this.filterForm.get('competenceSearch').valueChanges.pipe(takeUntil(this.subject$), debounceTime(500)).subscribe((value: ICompetence | string) => {
      if (value) {
        if (typeof value === 'string') {
          this.getCompetences();
        } else {
          value = value as IPerson;
          if (value?.id) {
            this.state.searchTerm[this.competenceParamName] = value.id;
          }
        }
      } else {
        if (this.state?.searchTerm[this.competenceParamName]) {
          deleteField(this.state.searchTerm, this.competenceParamName);
        }
      }
    });
    this.filterForm.get('portfolioLevel').valueChanges.pipe(takeUntil(this.subject$)).subscribe((value: string) => {
      if (value) {
        this.state.searchTerm[this.portfolioLevelParamName] = value;
      } else {
        if (this.state?.searchTerm[this.portfolioLevelParamName]) {
          deleteField(this.state.searchTerm, this.portfolioLevelParamName);
        }
      }
    });
  }

  getPeople(): void {
    const query: any = {page: 0, size: 10};
    if (this.filterForm.get('personSearch').value) {
      query['search'] = this.filterForm.get('personSearch').value;
    }
    this.personService.query('freelancer', query).pipe(takeUntil(this.subject$)).subscribe(({people}) => {
      this.people = people ?? undefined;
      if (this.people && this.state.searchTerm[this.personParamName]) {
        this.filterForm.get('personSearch').setValue(this.people.find(person => person.id === this.state.searchTerm[this.personParamName]), {emitEvent: false});
      }
    });
  }

  getCompetences(): void {
    const query: any = {page: 0, size: 10};
    if (this.filterForm.get('competenceSearch').value) {
      query['search'] = this.filterForm.get('competenceSearch').value;
    }
    this.competenceService.query(query).pipe(takeUntil(this.subject$)).subscribe(({competences}) => {
      this.competences = competences ?? undefined;
      this.filterForm.get('competenceSearch').setValue(this.competences.find(competence => competence.id === this.state.searchTerm[this.competenceParamName]), {emitEvent: false});

    });
  }

  search(): void {
    this.close(this.state.getQueryWithoutUndefined());
  }

  close(res?: any) {
    this.dialogRef.close(res);
  }

  resetFilterForm(): void {
    this.state = new State(null, true);
    this.close(this.state.getQueryWithoutUndefined());
  }

  trackPeopleByFn(index: number, item: any): any {
    return item.id;
  }

  trackCompetenceByFn(index: number, item: any): any {
    return item.id;
  }

  viewPersonHandle(value: IPerson | string): any {
    if (typeof value === 'string') {
      return value;
    } else {
      return (value as IPerson)?.name;
    }
  }

  viewCompetenceHandle(value: ICompetence | string): any {
    if (typeof value === 'string') {
      return value;
    } else {
      return (value as ICompetence)?.name;
    }
  }
}
