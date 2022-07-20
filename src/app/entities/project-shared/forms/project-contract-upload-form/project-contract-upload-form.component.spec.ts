import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContractUploadFormComponent } from './project-contract-upload-form.component';

describe('ProjectContractUploadFormComponent', () => {
  let component: ProjectContractUploadFormComponent;
  let fixture: ComponentFixture<ProjectContractUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectContractUploadFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContractUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
