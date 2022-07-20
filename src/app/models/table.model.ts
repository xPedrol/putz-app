export interface ITableColumn {
  title: string;
  name: string;
  class: string;
  sort?: boolean;
  hidden?:boolean;
}

export class TableColumn implements ITableColumn {
  class: string;
  name: string;
  sort: boolean;
  title: string;
  hidden?:boolean;

  constructor(column: any) {
    this.name = column.name;
    this.sort = column.sort ?? true;
    this.hidden = column.sort ?? false;
    this.title = column.title;
    this.class = column.class;
  }

}
