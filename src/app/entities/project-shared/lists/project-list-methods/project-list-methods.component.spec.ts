import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListMethodsComponent } from './project-list-methods.component';

describe('ProjectListMethodsComponent', () => {
  let component: ProjectListMethodsComponent;
  let fixture: ComponentFixture<ProjectListMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
