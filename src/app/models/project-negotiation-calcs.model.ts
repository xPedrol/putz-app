export interface IProjectNegotiationCalcs {
  /* Valor do Tributo */
  tributePercent?: number;
  tributeValue?: number;


  itemsBaseSum?: number | null;
  extraItemsBaseSum?: number | null;
  /* Valor da Commissão */
  commissionPercent?: number;
  commissionValue?: number;

  /* Valor da Commissão Agencia*/
  agencyCommissionPercent?: number;
  agencyCommissionBaseValue?: number;
  agencyCommissionRebateValue?: number;
  agencyCommissionFinalValue?: number;

  resumeCommisTaxProfitSumPercent?: number;

  /* Urgencia/Prioridade */
  priorityPercent?: number;
  priorityValue?: number;
  insurancePercent?: number;
  insuranceValue?: number;

  /* Total dos Custos do Freela */
  itemsSum?: number;
  itemsBasedSum?: number;
  itemsBasedSumWithPriority?: number;
  itemsBasedSumWithPriorityPlusInsurance?: number;
  itemsCostPercentage?: number;

  /* Profit */
  profitTargetPercent?: number;
  negotiationRebatePercent?: number;
  negotiationRebateValue?: number;

  // totalPercentFreelancer?: number;

  /** Início Descontos Agencia/Putz  **/
  /* Descontos Pagamento */
  paymentFactorPercent?: number;
  paymentFactorValue?: number;

  rebateSubscriberValue?: number;
  rebateSubscriberPercent?: number;
  rebateSubscriberTime?: number;

  rebateSubscriberPlan?: number;
  resumeTotalAgencyPutzRebatePercent?: number;
  /** Fim Descontos Agencia/Putz  **/

  /** Início Descontos Agencia  **/
  /* Desconto de Créditos no Vídeo margem Agencia */
  rebateCreditsPercent?: number;
  rebateCreditsValue?: number;
  /* Desconto de marca dágua no Vídeo margem Agencia */
  rebateWatermarkPercent?: number;
  rebateWatermarkValue?: number;

  resumeTotalAgencyRebatePercent?: number;
  /** Fim Descontos Agencia  **/

  quantity?: number;
  videoTime?: number;

  finalPrice?: number;
  finalCosts?: number;
  /* Valor do Lucro Liquido */
  finalProfit?: number;
  finalExtraBudget?: number;
  profitFinalPercent?: number;
}

export class ProjectNegotiationCalcs implements IProjectNegotiationCalcs {
  constructor(
    /* Valor do Tributo */
    public tributePercent?: number,
    public tributeValue?: number,

    /* Valor da Commissão */
    public commissionPercent?: number,
    public commissionValue?: number,

    /* Valor da Commissão Agencia*/
    public agencyCommissionPercent?: number,
    public agencyCommissionBaseValue?: number,
    public agencyCommissionRebateValue?: number,
    public agencyCommissionFinalValue?: number,

    public resumeCommisTaxProfitSumPercent?: number,

    /* Valor do Urgencia/Prioridade */
    public priorityPercent?: number,
    public priorityValue?: number,
    public insurancePercent?: number,
    public insuranceValue?: number,

    /* Total dos Custos do Freela */
    public itemsSum?: number,
    public itemsBaseSum?: number,
    public extraItemsBaseSum?: number,
    public itemsBasedSumWithPriority?: number,
    public itemsBasedSumWithPriorityPlusInsurance?: number,
    public itemsCostPercentage?: number,

    /* Profit */
    public profitTargetPercent?: number,
    public negotiationRebatePercent?: number,
    public negotiationRebateValue?: number,
    // public totalPercentFreelancer?: number,

    /** Início Descontos Agencia/Putz  **/
    /* Descontos Pagamento */
    public paymentType?: string,
    public paymentFactorPercent?: number,
    public paymentFactorValue?: number,

    public rebateSubscriberValue?: number,
    public rebateSubscriberPercent?: number,
    public rebateSubscriberTime?: number,
    public rebateSubscriberPlan?: number,
    public resumeTotalAgencyPutzRebatePercent?: number,
    /** Fim Descontos Agencia/Putz  **/

    /** Início Descontos Agencia  **/
    /* Desconto de Créditos no Vídeo margem Agencia */
    public rebateCreditsPercent?: number,
    public rebateCreditsValue?: number,
    /* Desconto de marca dágua no Vídeo margem Agencia */
    public rebateWatermarkPercent?: number,
    public rebateWatermarkValue?: number,
    public resumeTotalAgencyRebatePercent?: number,
    /** Fim Descontos Agencia  **/

    public quantity?: number,
    public videoTime?: number,

    /* Valor do Lucro Liquido */
    public profitValue?: number,

    public finalPrice?: number,
    public finalCosts?: number,
    public finalProfit?: number,
    public finalExtraBudget?: number,
    public profitFinalPercent?: number
  ) {}
}
