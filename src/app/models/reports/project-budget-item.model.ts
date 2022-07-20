export interface IProjectBudgetItemData {
  project: string;
  type: string;
  value: number;
}

export interface IProjectBudgetItemDataByType {
  name: string;
  projectBudgetItems: IProjectBudgetItemData[];
}
