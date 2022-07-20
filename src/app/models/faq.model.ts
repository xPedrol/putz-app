import {FaqType} from "./enums/faq-type.model";
import {Moment} from "moment";
import * as moment from "moment";
import {ITag} from "./tag.model";

export interface IFaq {
  id?: number | null;
  ask?: string | null;
  answer?: string | null;
  itemorder?: number | null;
  page?: FaqType | null;
  isActive?: boolean | null;
  createdBy?: string | null;
  createdDate?: Moment | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: Moment | null;
}

export class Faq implements IFaq {
  id?: number | null;
  ask?: string | null;
  answer?: string | null;
  itemorder?: number | null;
  page?: FaqType | null;
  isActive: boolean | null;
  createdBy: string | null;
  createdDate: Moment | null;
  lastModifiedBy: string | null;
  lastModifiedDate: Moment | null;

  constructor(faq?: IFaq) {
    this.id = faq?.id;
    this.ask = faq?.ask;
    this.answer = faq?.answer;
    this.itemorder = faq?.itemorder;
    this.page = faq?.page;

    this.isActive = faq.isActive ?? false;
    this.createdBy = faq.createdBy;
    this.createdDate = faq.createdDate ? moment(faq.createdDate) : null;
    this.lastModifiedBy = faq.lastModifiedBy;
    this.lastModifiedDate = faq.lastModifiedDate ? moment(faq.lastModifiedDate) : null;
  }
}

export function getFaqIdentifier(faq: ITag): number | undefined {
  return faq.id;
}

export const faqTableColumn = [
  {
    title: 'ID',
    class: 'text-md-left'
  },
  {
    title: 'Pergunta',
    class: 'text-md-left'
  },
  // {
  //   title: 'Resposta',
  //   class: 'text-md-left'
  // },
  {
    title: 'Ordem Item',
    class: 'text-md-left'
  },
  {
    title: 'Página',
    class: 'text-md-left'
  }, {
    title: '',
    class: 'text-md-left'
  }
];

export interface IFaqStructure {
  faqType: FaqType;
  faqs: IFaq[];
}
