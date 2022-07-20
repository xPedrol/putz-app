import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCrudDashboardComponent } from './tag-crud-dashboard.component';

describe('TagCrudDashboardComponent', () => {
  let component: TagCrudDashboardComponent;
  let fixture: ComponentFixture<TagCrudDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCrudDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCrudDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
