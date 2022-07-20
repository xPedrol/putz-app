import {Moment} from "moment";

export interface IFormCreditas {
  data_venc: Moment;
  email: string;
  id: string;
  name: string;
  produto: ProdutoEnum;
  taxa_juros: number;
  valor_empr: number;
  valor_parc: number;
  whatsapp: string;
}

export enum ProdutoEnum {
  AUTO_EQUITY = 'AUTO_EQUITY',
  AUTO_FIN = 'AUTO_FIN',
  HOME_EQUITY = 'HOME_EQUITY '
}

export const ProdutoEnumArray = [
  ProdutoEnum.AUTO_EQUITY,
  ProdutoEnum.AUTO_FIN,
  ProdutoEnum.HOME_EQUITY
];
