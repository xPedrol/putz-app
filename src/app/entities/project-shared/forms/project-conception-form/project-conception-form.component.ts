import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IProject} from '../../../../models/project.model';
import {ProjectService} from '../../../../services/project.service';
import {combineLatest, Subject} from 'rxjs';
import {IProjectNegotiationCalcs} from '../../../../models/project-negotiation-calcs.model';
import {IConfigParams} from '../../../../models/config-params.model';
import {ConfigParamsService} from '../../../../services/config-params.service';
import {configParamsType} from '../../../../constants/configParams.constants';
import {IProjectNegotiationParams, ProjectNegotiationParams} from '../../../../models/project-negotiation-params.model';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-project-conception-form',
  templateUrl: './project-conception-form.component.html',
  styleUrls: ['./project-conception-form.component.scss']
})
export class ProjectConceptionFormComponent implements OnInit, OnDestroy, OnChanges {
  subject$: Subject<any>;
  editForm: FormGroup;
  @Input() advancedConception = false;
  @Input() canEdit;
  project: IProject | undefined;
  negotiationCalc: IProjectNegotiationCalcs | undefined;
  paymentTypes: IConfigParams[] | undefined;
  priorityTypes: IConfigParams[] | undefined;
  insuranceTypes: IConfigParams[] | undefined;
  profitTypes: IConfigParams[] | undefined;

  constructor(
    private projectService: ProjectService,
    private configService: ConfigParamsService,
  ) {
    this.subject$ = new Subject<any>();
    this.editForm = new FormGroup({
      profitTargetPercent: new FormControl(null),
      tributePercent: new FormControl(null),
      agencyCommissionPercent: new FormControl(null, [Validators.required]),
      commissionPercent: new FormControl(null, [Validators.required, Validators.max(5)]),
      insuranceType: new FormControl(null),
      insurancePercent: new FormControl(null),
      itemsSum: new FormControl(null, []),
      quantity: new FormControl(null, [Validators.required]),
      videoTime: new FormControl(null, [Validators.required]),
      priorityType: new FormControl(null, [Validators.required]),
      priorityPercent: new FormControl(null),
      rebateSubscriberPercent: new FormControl(null, [Validators.max(10)]),
      negotiationRebatePercent: new FormControl(null, [Validators.required]),
      paymentType: new FormControl(null, [Validators.required]),
      paymentFactorPercent: new FormControl(null),
      rebateWatermarkPercent: new FormControl(null, [Validators.max(5), Validators.required]),
      rebateCreditsPercent: new FormControl(null, [Validators.max(5), Validators.required]),
      tributeAncine: new FormControl({value: null, disabled: true}),
    });
  }

  ngOnInit(): void {
    this.getParams();
  }


  getParams(): void {
    this.projectService.project$.pipe(takeUntil(this.subject$)).subscribe(project => {
      if (project) {
        this.project = project;
        if (this.project?.negotiation) {
          this.updateForm(this.project?.negotiation);
        }
      }
      this.getConfigType();
    });
    this.projectService.negotiationCalc$.pipe(takeUntil(this.subject$)).subscribe(negotiation => {
      if (negotiation) {
        this.negotiationCalc = negotiation;
        this.editForm.get('itemsSum')?.setValue(negotiation?.itemsSum);
      }
    });
  }

  validateAndGetRaw(): any {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
    } else if (this.canEdit) {
      return this.editForm.getRawValue();
    }
    return null;
  }

  updateForm(negotiation: any = null): void {
    negotiation = negotiation ?? this.negotiationCalc;
    if (negotiation) {
      this.editForm.patchValue({
        agencyCommissionPercent: negotiation?.agencyCommissionPercent,
        itemsSum: negotiation?.itemsSum ?? this.project?.negotiationCalc?.itemsSum,
        commissionPercent: negotiation?.commissionPercent,
        insurancePercent: negotiation?.insurancePercent,
        negotiationRebatePercent: negotiation?.negotiationRebatePercent,
        paymentFactorPercent: negotiation?.paymentFactorPercent,
        priorityPercent: negotiation?.priorityPercent,
        profitTargetPercent: negotiation?.profitTargetPercent,
        quantity: negotiation?.quantity,
        rebateCreditsPercent: negotiation?.rebateCreditsPercent,
        rebateSubscriberPercent: negotiation?.rebateSubscriberPercent,
        rebateWatermarkPercent: negotiation?.rebateWatermarkPercent,
        tributePercent: negotiation?.tributePercent,
        videoTime: negotiation?.videoTime,
        tributeAncine: negotiation?.tributeAncine,
      });
      if (negotiation?.tributeAncine) {
        this.editForm.get('tributeAncine').enable();
      }
    }
    this.editForm.get('agencyCommissionPercent')?.addValidators([Validators.max(this.project?.agencyMaxCommission ?? 0)]);
    this.editForm.get('agencyCommissionPercent')?.updateValueAndValidity();
  }


  validateAndGetNegotiationRaw(): any {
    const negotiationForCalc = this.advancedConception ? this.getNegotiationAdvancedForm(this.editForm.getRawValue()) : this.getNegotiationBasicForm(this.editForm.getRawValue());
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
    }
    if (this.editForm.valid) {
      this.editForm.markAsUntouched();
      return negotiationForCalc;
    }
  }

  getConfigType(): void {
    combineLatest([
      this.configService.getConfigParamsFromType(configParamsType.PAYMENT),
      this.configService.getConfigParamsFromType(configParamsType.INSURANCE),
      this.configService.getConfigParamsFromType(configParamsType.PROFIT_TARGET),
      this.configService.getConfigParamsFromType(configParamsType.PRIORITY)
    ]).pipe(takeUntil(this.subject$)).subscribe(([PAYMENT, INSURANCE, PROFIT_TARGET, PRIORITY]) => {
      this.paymentTypes = PAYMENT.body ?? [];
      this.insuranceTypes = INSURANCE.body ?? [];
      this.profitTypes = PROFIT_TARGET.body ?? [];
      this.priorityTypes = PRIORITY.body ?? [];
      this.editForm.patchValue({
        insuranceType: this.configService.findOnArray(this.project?.negotiation?.insuranceType, this.insuranceTypes),
        paymentType: this.configService.findOnArray(this.project?.negotiation?.paymentType, this.paymentTypes),
        priorityType: this.configService.findOnArray(this.project?.negotiation?.priorityType, this.priorityTypes)
      });
    });
  }

  getNegotiationAdvancedForm(negotiation: any): IProjectNegotiationParams {
    return new ProjectNegotiationParams(
      {
        agencyCommissionPercent: negotiation?.agencyCommissionPercent,
        //  comissão/interna*
        commissionPercent: negotiation?.commissionPercent,
        //  urgência/seguro
        priorityType: negotiation?.priorityType,
        priorityPercent: negotiation?.priorityPercent,
        //  custo base*
        itemsBaseSum: negotiation?.itemsBaseSum,
        //  negociação
        negotiationRebatePercent: negotiation?.negotiationRebatePercent,
        //  pagamento
        paymentType: negotiation?.paymentType,
        paymentFactorPercent: negotiation?.paymentFactorPercent,
        //
        profitTargetPercent: negotiation?.profitTargetPercent,
        //  crédito
        rebateCreditsPercent: negotiation?.rebateCreditsPercent,
        //  assinante
        rebateSubscriberPercent: negotiation?.rebateSubscriberPercent,
        insuranceType: negotiation?.insuranceType,
        insurancePercent: negotiation?.insurancePercent,
        quantity: negotiation?.quantity,
        videoTime: negotiation?.videoTime,
        rebateSubscriberPlan: 0,
        rebateSubscriberTime: 0,
        //  marca d'agua
        rebateWatermarkPercent: negotiation?.rebateWatermarkPercent,
        //  impostos*
        tributePercent: negotiation?.tributePercent
      }
    );

  }

  getNegotiationBasicForm(negotiation: any): IProjectNegotiationParams {
    return new ProjectNegotiationParams(
      {
        //  agência*
        agencyCommissionPercent: negotiation?.agencyCommissionPercent,
        //  urgência/seguro
        priorityType: negotiation?.priorityType,
        //  negociação
        negotiationRebatePercent: negotiation?.negotiationRebatePercent,
        //  pagamento
        paymentType: negotiation?.paymentType,
        //  crédito
        rebateCreditsPercent: negotiation?.agencyDiscounts ?? false,
        rebateWatermarkPercent: negotiation?.agencyDiscounts ?? false,
        insuranceType: negotiation?.insuranceType,
        quantity: negotiation?.quantity,
        videoTime: negotiation?.videoTime
      }
    );

  }

  insuranceChanged(event: any): void {
    this.insuranceTypes?.forEach(type => {
      if (type?.slug === event) {
        this.editForm.get('insurancePercent')!.setValue(type?.value);
        return;
      }
    });
  }

  priorityChanged(event: any): void {
    this.priorityTypes?.forEach(type => {
      if (type?.slug === event) {
        this.editForm.get('priorityPercent')!.setValue(type?.value);
        return;
      }
    });
  }

  paymentChanged(event: any): void {
    this.paymentTypes?.forEach(type => {
      if (type?.slug === event) {
        this.editForm.get('paymentFactorPercent')!.setValue(type?.value);
        return;
      }
    });
  }

  ngOnDestroy(): void {
    this.subject$.next(null);
    this.subject$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const advancedConception = changes['advancedConception'];
    if (this.editForm) {
      this.toggleAdvanced(advancedConception?.currentValue);
      if (changes.canEdit?.currentValue !== changes.canEdit?.previousValue) {
        if (changes.canEdit?.currentValue) {
          this.editForm.enable();
        } else {
          this.editForm.disable();
        }
      }
    }
  }

  toggleAdvanced(isAdvanced: boolean) {
    if (isAdvanced) {
      this.editForm.get('profitTargetPercent')?.addValidators([Validators.required, Validators.min(10)]);
      this.editForm.get('tributePercent')?.addValidators([Validators.required, Validators.max(20)]);
      this.editForm.get('rebateSubscriberPercent')?.addValidators([Validators.required]);
      this.editForm.get('commissionPercent')?.addValidators([Validators.required]);
      this.editForm.get('insurancePercent')?.addValidators([Validators.required]);
      this.editForm.get('priorityPercent')?.addValidators([Validators.required]);
      this.editForm.get('paymentFactorPercent')?.addValidators([Validators.required]);

    } else {
      this.editForm.get('profitTargetPercent')?.clearValidators();
      this.editForm.get('tributePercent')?.clearValidators();
      this.editForm.get('rebateSubscriberPercent')?.clearValidators();
      this.editForm.get('commissionPercent')?.clearValidators();
      this.editForm.get('insurancePercent')?.clearValidators();
      this.editForm.get('priorityPercent')?.clearValidators();
      this.editForm.get('paymentFactorPercent')?.clearValidators();
    }
    this.editForm.get('profitTargetPercent')?.updateValueAndValidity();
    this.editForm.get('tributePercent')?.updateValueAndValidity();
    this.editForm.get('paymentFactorPercent')?.updateValueAndValidity();
    this.editForm.get('priorityPercent')?.updateValueAndValidity();
    this.editForm.get('insurancePercent')?.updateValueAndValidity();
    this.editForm.get('commissionPercent')?.updateValueAndValidity();
    this.editForm.get('rebateSubscriberPercent')?.updateValueAndValidity();
  }
}
