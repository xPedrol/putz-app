import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCrudUpdateComponent } from './tag-crud-update.component';

describe('TagCrudUpdateComponent', () => {
  let component: TagCrudUpdateComponent;
  let fixture: ComponentFixture<TagCrudUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagCrudUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCrudUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
