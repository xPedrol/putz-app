import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCrudTableComponent } from './tag-crud-table.component';

describe('TagCrudTableComponent', () => {
  let component: TagCrudTableComponent;
  let fixture: ComponentFixture<TagCrudTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCrudTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
