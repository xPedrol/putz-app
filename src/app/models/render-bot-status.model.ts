export interface IRenderBotStatus {
  name: string;
  color: string;
}

export const statusList: IRenderBotStatus[] = [
  {
    name: 'Ativo',
    color: 'success'
  },
  {
    name: 'Ausente',
    color: 'warning'
  },
  {
    name: 'Inativo',
    color: 'danger'
  },
];
