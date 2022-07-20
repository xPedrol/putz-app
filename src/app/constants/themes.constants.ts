import {NbMenuItem} from '@nebular/theme';

export const themes: NbMenuItem[] | any = [
  {title: 'Claro', id: 'default'},
  // {id: 'putz'},
  {title: 'Escuro', id: 'dark'}
];
export enum ThemesEnum {
  DARK = 'dark',
  LIGHT = 'default'
}
