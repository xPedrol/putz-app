export interface ILastProjectDates {
  lastSevenDays: number;
  lastThirtyDays: number;
  lastTwentyFourHours: number;
}

export enum lastProjectsDatesEnum {
  lastSevenDays = 'lastSevenDays',
  lastThirtyDays = 'lastThirtyDays',
  lastTwentyFourHours = 'lastTwentyFourHours'
}
