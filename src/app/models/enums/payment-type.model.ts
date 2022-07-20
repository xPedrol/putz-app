export enum PaymentType {
  PIX = 'Pix',

  BANKORDER = 'Banc Order',

  CREDITCARD = 'Credit_Card',

  CASH = 'Cash',

  DEBIT = 'Debit',

  OTHER = 'Other',
}

export const paymentTypes: string[] = ['BANKORDER', 'CASH', 'CREDITCARD', 'DEBIT', 'OTHER', 'PAYMENT_30_POS_CONTRATO', 'PAYMENT_30_POS_NOTA', 'PAYMENT_50_POS_CONTRATO', 'PAYMENT_60_POS_NOTA', 'PAYMENT_90_POS_CONTRATO', 'PAYMENT_CASH', 'PAYMENT_DEFAULT_50_50', 'PAYMENT_IMPORTED', 'PIX'];
