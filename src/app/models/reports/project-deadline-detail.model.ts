export interface IApprovedProject {
  cost: IApprovedProjectCost;
  products: IApprovedProjectProduct[];
}

interface IApprovedProjectCost {
  percentage: number;
  totalFreela: number;
  totalCost: number;
  project: string;
}

interface IApprovedProjectProduct {
  product: string;
  value: number;
}
