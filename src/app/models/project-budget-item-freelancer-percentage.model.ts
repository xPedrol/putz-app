export interface IProjectBudgetItemFreelancerPercentage {
  percentage: number;
  totalFreela: number;
  totalCost: number;
}

export interface IProjectCostAndSaleGraph {
  avarage: number;
  project: string;
  salePrice: number;
  totalCost: number;
}

export interface IProjectDeadlineGraph {
  percentage: number;
  status: string;
  totalDays: number;
}

export interface IProjectBudgetItemFreelancerPercentageGroupDate {
  month: number;
  percentage: number;
  totalFreela: number;
  totalPrice: number;
  year: number;
}
