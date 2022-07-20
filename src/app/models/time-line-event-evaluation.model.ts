export interface ITimeLineEventEvaluation {
  customerRate?: number | null;
  conclusionDescription?: string | null;
  conclusionTitle?: string | null;
  id?: number | null;

}

export class TimeLineEventEvaluation implements ITimeLineEventEvaluation {
  customerRate: number | null;
  conclusionDescription: string | null;
  conclusionTitle: string | null;
  id: number | null;

  constructor(evaluation: any = {}) {
    evaluation = evaluation ?? {};
    this.customerRate = evaluation.customerRate;
    this.conclusionDescription = evaluation.conclusionDescription;
    this.conclusionTitle = evaluation.conclusionTitle;
    this.id = evaluation.id;
  }
}
