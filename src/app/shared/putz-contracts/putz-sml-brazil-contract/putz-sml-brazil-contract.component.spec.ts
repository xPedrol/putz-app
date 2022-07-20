import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutzSmlBrazilContractComponent } from './putz-sml-brazil-contract.component';

describe('PutzSmlBrazilContractComponent', () => {
  let component: PutzSmlBrazilContractComponent;
  let fixture: ComponentFixture<PutzSmlBrazilContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutzSmlBrazilContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PutzSmlBrazilContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
